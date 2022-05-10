package com.togethersports.tosproejct.chat;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Slf4j
@Component
public class con extends TextWebSocketHandler {

    @EventListener
    public void sample(SessionDisconnectEvent event){
            log.info("disconnect = {}", event.getSessionId());
            log.info("user = {}", event.getUser());

    }

    @EventListener
    public void sampl2(SessionConnectEvent event){
        log.info("connect = {}", event);
        log.info("aa = {}", event.getMessage());
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String id = headerAccessor.getSessionId();
        log.info("id = {}", id);

    }

    @EventListener
    public void am2(SessionConnectedEvent event){
        log.info("connected = {}", event.getMessage());
        log.info("user = {}", event.getUser());

    }
    @EventListener
    public void m2(SessionSubscribeEvent event){
        log.info("subscribe = {}", event.getMessage());
        log.info("event = {}", event.getUser());
        log.info("bb = {}", event.getSource().toString());

    }

    @EventListener
    public void m3(SessionDisconnectEvent event){

    }



}
