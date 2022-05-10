package com.togethersports.tosproject.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MessageOfLeave {

    private Long userId;
    private String userNickname;
}
