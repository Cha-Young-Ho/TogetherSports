package com.togethersports.tosproject.chat.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.togethersports.tosproject.participant.ParticipantService;
import com.togethersports.tosproject.participant.exception.NotParticipateRoomException;
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
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;

import java.util.HashMap;
import java.util.Map;

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

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        // 헤더 토큰 얻기
        String authorizationHeader = String.valueOf(headerAccessor.getNativeHeader("Authorization"));
        StompCommand command = headerAccessor.getCommand();
        ObjectMapper objectMapper = new ObjectMapper();
        Object a = message.getPayload();


       // MultiValueMap<String, String> map = objectMapper.convertValue(a, MultiValueMap.class);



        /*
            1. preHandler
               * jwt 검증
               * 해당 방 참여 검증 --------
               * controller 에서 받을 메세지 타입으로 생성
               * 예외 발생시 예외 throw

            2. chat controller
               * 메세지 -> 서비스 실행
                    * 서비스에서 chat 저장s

            3. out bound channel
               * 메세지 브로드 캐스팅으로 넘기기

            4. message broadcasting
               * 메세지 보내기
         */

        // 소켓 연결
        if(command.equals(StompCommand.CONNECT)){
            Long roomId = 2L;




            //JWT 인증 및 참여 여부 확인
            verifySend(authorizationHeader, roomId, message);

            //JWT 유저 정보 받기 (리팩토링 필요)
            User user = verifyJwt(authorizationHeader);

            //해당 유저 id, 룸 id, session 정보 저장
            participantService.verifySession(headerAccessor.getSessionId(), roomId, user.getId());
            if (user != null) {

            }
        }


        // SEND, SUBSCRIBE 일 경우
        if(command.equals(StompCommand.SEND) || command.equals(StompCommand.SUBSCRIBE)){



            Long roomId = 2L;
            // JWT 인증 및 참여 여부 확인

            return verifySend(authorizationHeader, roomId, message);
        }

        if(command.equals(StompCommand.DISCONNECT)){
            // 세션 연결 해제 메세지 생성
            // 세션 정보 지우기

            // 구독 정보 없애기


        }

        if (command.equals(StompCommand.UNSUBSCRIBE)) {


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
}


