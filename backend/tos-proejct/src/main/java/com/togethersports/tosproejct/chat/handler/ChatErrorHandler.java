package com.togethersports.tosproejct.chat.handler;

import com.togethersports.tosproejct.common.code.ResponseCode;
import com.togethersports.tosproejct.room.code.RoomCode;
import com.togethersports.tosproejct.security.jwt.JwtErrorCode;
import com.togethersports.tosproejct.security.jwt.exception.JwtExpiredTokenException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.StompSubProtocolErrorHandler;

import java.nio.charset.MalformedInputException;
import java.nio.charset.StandardCharsets;

/**
 * <h1>ChatErrorHandler</h1>
 * <p>
 *     채팅 관련 예외 처리 핸들러
 * </p>
 * @author younghocha
 */

@Component
public class ChatErrorHandler extends StompSubProtocolErrorHandler {

    public ChatErrorHandler() {
        super();
    }

    /**
     * @param clientMessage : 실제 사용자 메세지
     * @param ex : 예외 내용
     * @return : 예외 내용 메세지
     * @author : younghoCha
     */
    @Override
    public Message<byte[]> handleClientMessageProcessingError(Message<byte[]>clientMessage, Throwable ex)
    {
        if(ex.getCause().getMessage().equals("JWT")){
            return handleJwtException();
        }

        if(ex.getCause().getMessage().equals("Auth")){
            return handleUnauthorizedException();
        }

        return super.handleClientMessageProcessingError(clientMessage, ex);
    }

    /**
     * 방에 대한 권한이 없을 경우를 처리하는 메소드
     * @return : Client에 전달하기위한 예외 내용에 대한 메세지
     * @author younghoCha
     */
    // 권한 예외(해당 방에 접속하지 않았을 시)
    private Message<byte[]> handleUnauthorizedException()
    {


        return prepareErrorMessage(RoomCode.NOT_PARTICIPATE_ROOM);

    }

    /**
     * Jwt관련 예외 상황의 경우를 처리하는 메소드
     * @return : Client에 전달하기위한 예외 내용에 대한 메세지
     * @author : younghoCha
     */
    // JWT 예외
    private Message<byte[]> handleJwtException(){


        return prepareErrorMessage(JwtErrorCode.ACCESS_TOKEN_EXPIRATION);
    }

    /**
     * 메세지 생성을 위한 메소드
     * @param responseCode : 예외 내용에 따라 다른 코드를 전달
     * @return : Client에 전달될 메세지
     * @author younghoCha
     */
    // 메세지 생성
    private Message<byte[]> prepareErrorMessage(ResponseCode responseCode)
    {
        String code = String.valueOf(responseCode.getMessage());

        StompHeaderAccessor accessor = StompHeaderAccessor.create(StompCommand.ERROR);


        accessor.setMessage(String.valueOf(responseCode.getCode()));
        accessor.setLeaveMutable(true);

        return MessageBuilder.createMessage(code.getBytes(StandardCharsets.UTF_8), accessor.getMessageHeaders());
    }


}
