package com.togethersports.tosproject.chat.dto;

import com.togethersports.tosproject.chat.SystemMessageType;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OnOfflineOfUser {
    private SystemMessageType messageType;
    private String message;
    private String userNickname;
    private Long userId;
}
