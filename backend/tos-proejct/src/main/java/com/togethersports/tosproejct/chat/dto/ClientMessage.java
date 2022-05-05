package com.togethersports.tosproejct.chat.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * <h1>ClientMessage</h1>
 * <p>
 *     사용자가 보낸 메세지를 받기위한 DTO
 * </p>
 * @author younghoCha
 */
@Builder
@Getter
public class ClientMessage {

    private Long userId;
    private String target;
    private String message;
}
