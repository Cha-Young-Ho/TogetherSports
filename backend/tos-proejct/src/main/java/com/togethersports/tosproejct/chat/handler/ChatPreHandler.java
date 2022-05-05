package com.togethersports.tosproejct.chat.handler;

import com.togethersports.tosproejct.security.jwt.JwtProperties;
import com.togethersports.tosproejct.security.jwt.exception.JwtExpiredTokenException;
import com.togethersports.tosproejct.security.jwt.exception.JwtModulatedTokenException;
import com.togethersports.tosproejct.security.jwt.service.JwtService;
import com.togethersports.tosproejct.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
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

    private final JwtService<User> jwtService;
    private final JwtProperties jwtProperties;
    private static final String BEARER_PREFIX = "Bearer ";

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {


        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        // 헤더 토큰 얻기
        String authorizationHeader = String.valueOf(headerAccessor.getNativeHeader("Authorization"));
        String command = String.valueOf(headerAccessor.getHeader("stompCommand"));
        // 토큰 자르기 fixme 토큰 자르는 로직 validate 로 리팩토링

        //SEND Command 시에만 JWT 검증을 수행한다.
        //DISCONNECT 일 경우 Auth 헤더가 추가되지 않음.
        if(!command.equals("SEND")){
            return message;
        }

        if(authorizationHeader == null || authorizationHeader.equals("null")){
            throw new MalformedJwtException("JWT");
        }

        String token = authorizationHeader.substring(BEARER_PREFIX.length());

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

        //인증 성공 시
        return message;
    }
}
