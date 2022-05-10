package com.togethersports.tosproejct.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MessageOfLeave {

    private Long userId;
    private String userNickname;
}
