package com.togethersports.tosproject.chat.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.togethersports.tosproject.chat.SystemMessageType;
import com.togethersports.tosproject.chat.code.ChatCode;
import com.togethersports.tosproject.chat.dto.OnOfflineOfUser;
import com.togethersports.tosproject.participant.Participant;
import com.togethersports.tosproject.participant.ParticipantService;
import com.togethersports.tosproject.participant.Status;
import com.togethersports.tosproject.participant.exception.NotParticipateRoomException;
import com.togethersports.tosproject.room.Room;
import com.togethersports.tosproject.security.jwt.JwtProperties;
import com.togethersports.tosproject.security.jwt.exception.JwtExpiredTokenException;
import com.togethersports.tosproject.security.jwt.exception.JwtModulatedTokenException;
import com.togethersports.tosproject.security.jwt.service.JwtService;
import com.togethersports.tosproject.security.jwt.util.JwtUserConvertor;
import com.togethersports.tosproject.user.User;
import com.togethersports.tosproject.user.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * <h1>ChatPreHandler</h1>
 * <p>
 *     채팅 전달 전, 사용자의 인증을 수행하는 클래스
 * </p>
 * @author younghocha
 */

@RequiredArgsConstructor
@Component
public class ChatPreHandler implements ChannelInterceptor {
    private static final String BEARER_PREFIX = "Bearer ";
    private final JwtService<User> jwtService;
    private final JwtProperties jwtProperties;
    private final JwtUserConvertor jwtUserConvertor;
    private final ParticipantService participantService;
    private final UserService userService;

    @Transactional
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        // 헤더 토큰 얻기
        String authorizationHeader = String.valueOf(headerAccessor.getNativeHeader("Authorization"));
        StompCommand command = headerAccessor.getCommand();
        Long roomId = null;
        if(!command.equals(StompCommand.DISCONNECT)){

            roomId = Long.parseLong(String.valueOf(headerAccessor.getNativeHeader("roomId").get(0)));
        }


        //Message
        if(command.equals(StompCommand.SEND)){
            //시스템 Message
            String typeHeader = null;

            if(headerAccessor.getNativeHeader("type") != null){
                typeHeader = String.valueOf(headerAccessor.getNativeHeader("type").get(0));
                if(typeHeader.equals("system")){
                    return message;
                }
            }

            //사용자 Message
            // JWT 인증 및 참여 여부 확인
            return verifySend(authorizationHeader, roomId, message);

        }

        //SUBSCRIBE
        if(command.equals(StompCommand.SUBSCRIBE)){

        }
        //CONNECT
        // 소켓 연결
        if(command.equals(StompCommand.CONNECT)){
            //JWT 인증 및 참여 여부 확인
            verifySend(authorizationHeader, roomId, message);

            //JWT 유저 정보 받기 (리팩토링 필요)
            User tokenClaimUser = verifyJwt(authorizationHeader);

            //참가 엔티티 찾기
            Participant participantEntity = participantService.verifySession(headerAccessor.getSessionId(), roomId, tokenClaimUser.getId());
            User user = participantEntity.getUser();

            //참가자 엔티티의 session id 개수가 0개일 경우 -> 온라인 ws보내야함
            if(participantEntity.getStatus().equals(Status.OFFLINE)){

                Room room = participantEntity.getRoom();

                StompHeaderAccessor accessor = StompHeaderAccessor.create(StompCommand.SEND);
                accessor.setMessage(String.valueOf(ChatCode.SYSTEM_USER_ONLINE.getCode()));
                accessor.setNativeHeader("destination", "/api/room/" + room.getId() + "/chat");
                accessor.setNativeHeader("roomId", String.valueOf(room.getId()));
                accessor.setNativeHeader("type", "system");
                accessor.setHeader("userId", user.getId());
                accessor.setSessionId(headerAccessor.getSessionId());
                accessor.setSessionAttributes(headerAccessor.getSessionAttributes());
                accessor.setLeaveMutable(true);
                accessor.setDestination("/api/room/"+room.getId()+"/chat");

                OnOfflineOfUser onlineOfUser = OnOfflineOfUser.builder()
                        .userId(user.getId())
                        .userNickname(user.getNickname())
                        .message(user.getNickname() + "님이 온라인이 되었습니다.")
                        .messageType(SystemMessageType.ONLINE)
                        .build();

                ObjectMapper om = new ObjectMapper();

                try {
                    channel.send(MessageBuilder.createMessage(om.writeValueAsBytes(onlineOfUser), accessor.getMessageHeaders()));
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
            }
            //session 저장
            participantService.saveSession(headerAccessor.getSessionId(), participantEntity);


            //participant status 상태 저장
            participantEntity.checkOnOffline();

        }

        //DISCONNECT
        if(command.equals(StompCommand.DISCONNECT)){
            // 세션 연결 해제 메세지 생성
            // 세션 정보 지우기
            // 구독 정보 없애기

            Participant participant = participantService.findParticipantBySessionId(headerAccessor.getSessionId());
            participant.checkOnOffline();
            Room room = participant.getRoom();
            User user = participant.getUser();

            //세션 삭제
            participantService.deleteSession(headerAccessor.getSessionId(), participant);


            //disconnect일 경우에 session id를 이용하여 Repository 조회를 한 뒤에 해당하는 엔티티 삭제 요청을 해야 한다.
            StompHeaderAccessor accessor = StompHeaderAccessor.create(StompCommand.SEND);
            accessor.setMessage(String.valueOf(ChatCode.SYSTEM_USER_OFFLINE.getCode()));
            accessor.setNativeHeader("destination", "/api/room/" + room.getId() + "/chat");
            accessor.setNativeHeader("roomId", String.valueOf(room.getId()));
            accessor.setNativeHeader("type", "system");
            accessor.setHeader("userId", user.getId());
            accessor.setSessionId(headerAccessor.getSessionId());
            accessor.setSessionAttributes(headerAccessor.getSessionAttributes());
            accessor.setLeaveMutable(true);
            accessor.setDestination("/api/room/"+room.getId()+"/chat");

            OnOfflineOfUser offlineOfUser = OnOfflineOfUser.builder()
                    .userId(user.getId())
                    .userNickname(user.getNickname())
                    .message(user.getNickname() + "님이 오프라인이 되었습니다.")
                    .messageType(SystemMessageType.OFFLINE)
                    .build();

            ObjectMapper om = new ObjectMapper();

            try {
                channel.send(MessageBuilder.createMessage(om.writeValueAsBytes(offlineOfUser), accessor.getMessageHeaders()));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }


        }
        return message;
    }

    public User verifyJwt(String accessToken){
        if(accessToken == null || accessToken.equals("null")){
            throw new MalformedJwtException("JWT");
        }
        //Bearer 문자 자르기
        String token = accessToken.substring(BEARER_PREFIX.length());

        // 토큰 인증
        Claims claims;
        try{
            claims = jwtService.verifyToken(token, jwtProperties.getAccessTokenSigningKey());
        }catch (JwtExpiredTokenException e){ // 만료 예외
            throw new MessageDeliveryException("JWT");
        }catch (MalformedJwtException e){ //변조 예외
            throw new MalformedJwtException("JWT");
        }catch (JwtModulatedTokenException e){ //변조 예외
            throw new JwtModulatedTokenException("JWT");
        }

        return jwtUserConvertor.apply(claims);

    }
    public boolean verifyParticipate(Long userId, Long roomId){
        return participantService.checkAttendance(userId, roomId);
    }
    public Message<?> verifySend(String token, Long roomId, Message message){

        //토큰 검증
        User user = verifyJwt(token);

        //해당 방에 참가했는지 확인
        //참가하지 않은 경우 거부 응답
        boolean abc = verifyParticipate(user.getId(), roomId);
        if(!abc){
            //메세지 생성 및 send
            throw new NotParticipateRoomException("Auth");
        }

        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        headerAccessor.setHeader("userId", user.getId());

        //참가한 경우 성공 응답
        return MessageBuilder.createMessage(message.getPayload(), headerAccessor.getMessageHeaders());
    }

}


