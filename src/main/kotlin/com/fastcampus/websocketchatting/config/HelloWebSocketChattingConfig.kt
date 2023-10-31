package com.fastcampus.websocketchatting.config

import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.config.MessageBrokerRegistry
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker
import org.springframework.web.socket.config.annotation.StompEndpointRegistry
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer

@Configuration
@EnableWebSocketMessageBroker
class HelloWebSocketChattingConfig: WebSocketMessageBrokerConfigurer {

    companion object {
        private const val ENDPOINT = "/hello-websocket-chatting"
        private const val SIMPLE_BROKER = "/topic"
        private const val PUBLISH = "/app"
    }

    override fun configureMessageBroker(registry: MessageBrokerRegistry) {
        registry.enableSimpleBroker(SIMPLE_BROKER)
        registry.setApplicationDestinationPrefixes(PUBLISH)
    }

    override fun registerStompEndpoints(registry: StompEndpointRegistry) {
        registry
            .addEndpoint(ENDPOINT)
            .setAllowedOriginPatterns("*")
    }
}