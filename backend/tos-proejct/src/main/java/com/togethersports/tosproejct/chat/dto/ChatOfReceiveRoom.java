package com.togethersports.tosproejct.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ChatOfReceiveRoom {

    private String userNickname;
    private String userProfileImagePath;
    private ChatOfMessage content;

}
