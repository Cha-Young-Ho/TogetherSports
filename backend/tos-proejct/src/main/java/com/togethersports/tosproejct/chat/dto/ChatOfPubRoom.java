package com.togethersports.tosproejct.chat.dto;

import lombok.Builder;
import lombok.Getter;

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
    Long userId;
    String nickname;
    String userProfileImagePath;
    ChatOfMessage content;
}
