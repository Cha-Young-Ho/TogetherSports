package com.togethersports.tosproejct.chat.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ChatOfMessage {

    private String message;
    private LocalDateTime sendAt;
}
