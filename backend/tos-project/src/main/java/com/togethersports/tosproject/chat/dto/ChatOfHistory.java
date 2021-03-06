package com.togethersports.tosproject.chat.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * <h1>ChatOfHistory</h1>
 * <p>
 *     채팅 내역 조회를 위한 DTO
 * </p>
 * @author younghoCha
 */
@Builder
@Getter
public class ChatOfHistory {

    private Long userId;
    private String nickname;
    private String userProfileImagePath;
    private String message;
    private LocalDateTime sendAt;

}
