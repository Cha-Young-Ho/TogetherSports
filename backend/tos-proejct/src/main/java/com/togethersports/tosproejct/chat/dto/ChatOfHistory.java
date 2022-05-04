package com.togethersports.tosproejct.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ChatOfHistory {

    private Long userId;
    private String nickname;
    private String userProfileImagePath;
    private ChatOfMessage messageContent;

}
