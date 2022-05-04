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

@Slf4j
@Component
public class ChatErrorHandler extends StompSubProtocolErrorHandler {

    public ChatErrorHandler() {
        super();
    }

    @Override
    public Message<byte[]> handleClientMessageProcessingError(Message<byte[]>clientMessage, Throwable ex)
    {
        if(ex.getCause().getMessage().equals("JWT")){
            return handleJwtException(clientMessage, ex);
        }

        if(ex.getCause().getMessage().equals("Auth")){
            return handleUnauthorizedException(clientMessage, ex);
        }

        return super.handleClientMessageProcessingError(clientMessage, ex);
    }


    // 권한 예외(해당 방에 접속하지 않았을 시)
    private Message<byte[]> handleUnauthorizedException(Message<byte[]> clientMessage, Throwable ex)
    {

        ApiError apiError = new ApiError(
                ex.getMessage());

        return prepareErrorMessage(RoomCode.NOT_PARTICIPATE_ROOM);

    }

    // JWT 예외
    private Message<byte[]> handleJwtException(Message<byte[]> clientMessage, Throwable ex){


        return prepareErrorMessage(JwtErrorCode.ACCESS_TOKEN_EXPIRATION);
    }

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
