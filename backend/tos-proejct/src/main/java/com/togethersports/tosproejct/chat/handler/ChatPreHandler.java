package com.togethersports.tosproejct.chat.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class ChatPreHandler implements ChannelInterceptor {



    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        log.info("message = {}", message);
//
//        if (StompCommand.CONNECT.equals(headerAccessor.getCommand())) {
//            System.out.println("msg: " + "conne");
//        }
//
//
//        return message;

//        return message;
        throw new RuntimeException();
    }
}
