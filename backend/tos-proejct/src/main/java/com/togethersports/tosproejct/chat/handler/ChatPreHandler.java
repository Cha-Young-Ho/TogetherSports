package com.togethersports.tosproejct.chat.handler;

import com.togethersports.tosproejct.participant.ParticipantService;
import com.togethersports.tosproejct.participant.exception.NotParticipateRoomException;
import com.togethersports.tosproejct.security.jwt.JwtProperties;
import com.togethersports.tosproejct.security.jwt.exception.JwtExpiredTokenException;
import com.togethersports.tosproejct.security.jwt.exception.JwtModulatedTokenException;
import com.togethersports.tosproejct.security.jwt.service.JwtService;
import com.togethersports.tosproejct.security.jwt.util.JwtUserConvertor;
import com.togethersports.tosproejct.user.User;
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
        // 소켓 연결
        if(command.equals(StompCommand.CONNECT)){

            Long roomId= 1L;
            verifySend(authorizationHeader, roomId, message);
        }
        // SEND, SUBSCRIBE 일 경우
        if(command.equals(StompCommand.SEND) || command.equals(StompCommand.SUBSCRIBE)){
            Long roomId = 1L;
            //Long roomId = Long.valueOf(map.getFirst("roomId"));

            return verifySend(authorizationHeader, roomId, message);
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
        if(!verifyParticipate(user.getId(), roomId)){
            //메세지 생성 및 send

            throw new NotParticipateRoomException("Auth");
        }
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        headerAccessor.setHeader("userId", user.getId());
        //참가한 경우 성공 응답
        return MessageBuilder.createMessage(message.getPayload(), headerAccessor.getMessageHeaders());
    }
}
