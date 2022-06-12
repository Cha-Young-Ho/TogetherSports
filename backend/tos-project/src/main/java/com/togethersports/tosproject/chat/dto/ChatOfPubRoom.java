package com.togethersports.tosproject.chat.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * <h1>ChatOfPubRoom</h1>
 * <p>
 *     채팅 1개를 publish 하기 위한 DTO
 * </p>
 * @author younghoCha
 */
@Builder
@Getter
public class ChatOfPubRoom {
    private Long userId;
    private String nickname;
    private String userProfileImagePath;
    private String message;
    private LocalDateTime sendAt;

}
