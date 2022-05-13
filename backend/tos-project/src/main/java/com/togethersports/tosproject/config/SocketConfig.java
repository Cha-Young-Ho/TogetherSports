package com.togethersports.tosproject.config;

import com.togethersports.tosproject.chat.handler.ChatErrorHandler;
import com.togethersports.tosproject.chat.handler.ChatPreHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * <h1>SocketConfig</h1>
 * <p>
 *     소켓 설정
 * </p>
 * @author younghocha
 */
@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class SocketConfig implements WebSocketMessageBrokerConfigurer {

    private final ChatPreHandler chatPreHandler;
    private final ChatErrorHandler chatErrorHandler;

    /**
     * 소켓 관련 설정 메소드
     * endpoint 설정, 예외 핸들러 설정
     * @param registry
     * @author younghoCha
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api/websocket").setAllowedOriginPatterns("*").withSockJS();
        registry.setErrorHandler(chatErrorHandler);

    }

    /**
     * 메세지브로커 설정
     * 내부 브로커 사용 및 "/queue", "/topic" 캐치
     * prefix : "/api"
     * @param registry
     * @author younghoCha
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/queue", "/topic");
        registry.setApplicationDestinationPrefixes("/api");
        registry.setUserDestinationPrefix("/user");
    }

    /**
     * 메세지 관련 사용자 검증 설정 메소드
     * @param registration
     * @author younghoCha
     */
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(chatPreHandler);
    }



}
