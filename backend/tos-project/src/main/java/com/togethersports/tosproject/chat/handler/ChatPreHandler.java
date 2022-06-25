package com.togethersports.tosproject.chat.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.togethersports.tosproject.chat.SystemMessageType;
import com.togethersports.tosproject.chat.code.ChatCode;
import com.togethersports.tosproject.chat.dto.OfflineOfUser;
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
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * <h1>ChatPreHandler</h1>
 * <p>
 *     채팅 전달 전, 사용자의 인증을 수행하는 클래스
 * </p>
 * @author younghocha
 */

@Slf4j
@RequiredArgsConstructor
@Component
public class ChatPreHandler implements ChannelInterceptor {
    private static final String BEARER_PREFIX = "Bearer ";
    private final JwtService<User> jwtService;
    private final JwtProperties jwtProperties;
    private final JwtUserConvertor jwtUserConvertor;
    private final ParticipantService participantService;

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
            log.info("type native header = {} ", headerAccessor.getNativeHeader("type"));
            if(headerAccessor.getNativeHeader("type") != null){
                typeHeader = String.valueOf(headerAccessor.getNativeHeader("type").get(0));
                if(typeHeader.equals("system")){
                    return message;
                }
            }
            log.info("여기수행");
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
            User user = verifyJwt(authorizationHeader);

            //참가 엔티티 찾기
            Participant participantEntity = participantService.verifySession(headerAccessor.getSessionId(), roomId, user.getId());

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

                OfflineOfUser offlineOfUser = OfflineOfUser.builder()
                        .userId(user.getId())
                        .userNickname(user.getNickname())
                        .message(user.getNickname() + "님이 온라인이 되었습니다.")
                        .messageType(SystemMessageType.ONLINE)
                        .build();

                ObjectMapper om = new ObjectMapper();

                try {
                    channel.send(MessageBuilder.createMessage(om.writeValueAsBytes(offlineOfUser), accessor.getMessageHeaders()));
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
            //accessor.setNativeHeader("userId");
            accessor.setSessionId(headerAccessor.getSessionId());
            accessor.setSessionAttributes(headerAccessor.getSessionAttributes());
            accessor.setLeaveMutable(true);
            accessor.setDestination("/api/room/"+room.getId()+"/chat");

            OfflineOfUser offlineOfUser = OfflineOfUser.builder()
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
        log.info("userId 찍기전 user Id = {}", user.getId());
        headerAccessor.setHeader("userId", user.getId());

        //참가한 경우 성공 응답
        return MessageBuilder.createMessage(message.getPayload(), headerAccessor.getMessageHeaders());
    }

    /*
    * 1. 여러가지 상황에 따라 분기
    * 2. 분기
    *  - CONNECT : JWT 검증 -> Session 저장
    *  - CONNECTED : Session ID DB에 저장
    *  - SUBSCRIBE : JWT 검증
    *  - UNSUBSCRIBE : JWT 검증
    *  - DISCONNECT : JWT 검증
    *  - SEND : JWT 검증
    * 3. 해야될 기능
    *  - 입장
    *       - DB에 Participate 저장
    *       - 시스템 메세지 보내기
    *       - 업데이트 메세지 보내기
    *       - Session ID 저장
    *  - 나가기
    *       - DB에 Participate 삭제
    *       - 시스템 메세지 보내기 -> 소켓 끊어라!
    *       - 업데이트 메세지 보내기
    *       - Session ID 삭제
    *
    *  - 방 업데이트
    *       - 업데이트 될때마다 실행되는 메소드 실행
    */

    @Transactional
    @Override
    public void afterSendCompletion(Message<?> message, MessageChannel channel, boolean sent, Exception ex) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        // 헤더 토큰 얻기
        StompCommand command = headerAccessor.getCommand();
        String sessionId = headerAccessor.getSessionId();

        //기존 message랑 비교하기

        //status 만들기

        //content 만들기

        // payload 만들기





        if (command.equals(StompCommand.DISCONNECT)) {
//            Participant participant = participantService.findParticipantBySessionId(sessionId);
//            Room room = participant.getRoom();
//            User user = participant.getUser();
//
//            //disconnect일 경우에 session id를 이용하여 Repository 조회를 한 뒤에 해당하는 엔티티 삭제 요청을 해야 한다.
//            String code = String.valueOf(ChatCode.SYSTEM_USER_OFFLINE.getMessage());
//            StompHeaderAccessor accessor = StompHeaderAccessor.create(StompCommand.SEND);
//            accessor.setMessage(String.valueOf(ChatCode.SYSTEM_USER_OFFLINE.getCode()));
//            accessor.setNativeHeader("destination", "/api/room/" + room.getId() + "/chat");
//            accessor.setNativeHeader("roomId", String.valueOf(room.getId()));
//            accessor.setNativeHeader("type", "system");
//            accessor.setSessionId("123");
//            accessor.setSessionAttributes(null);
//            accessor.setLeaveMutable(true);
//            accessor.setDestination("/api/room/"+room.getId()+"/chat");
//
//            OfflineOfUser offlineOfUser = OfflineOfUser.builder()
//                            .userId(user.getId())
//                                    .userNickname(user.getNickname())
//                                            .message(user.getNickname() + "님이 오프라인이 되었습니다.")
//                    .build();
//            ;
//
//            //필요한거 찾기
//            // destination
//            // userId
//            // accessToken 구하기
//            // status, content 만들기
//
//
//
//
//
//            //roomId 얻기
//
//            //jwt userId 얻기
//
//
//            //log.info("여기 실행");
//
//            //log.info("message2 = {}", message2);
//            channel.send(MessageBuilder.createMessage(offlineOfUser, accessor.getMessageHeaders()));
        }


//        if(!command.equals(StompCommand.DISCONNECT)){
//
//            roomId = Long.parseLong(String.valueOf(headerAccessor.getNativeHeader("roomId").get(0)));
//        }
    }

    // 1. 메세지를 커스텀해서 생성하는 로직 완성

    // 2. 메세지를 보내는 로직 완성

    // 3. 메세지를 보내고 사후 처리하는 로직 완성





}


