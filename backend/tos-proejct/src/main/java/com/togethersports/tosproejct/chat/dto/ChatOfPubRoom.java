package com.togethersports.tosproejct.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ChatOfPubRoom {
    Long userId;
    String nickname;
    String userProfileImagePath;
    ChatOfMessage content;
}
