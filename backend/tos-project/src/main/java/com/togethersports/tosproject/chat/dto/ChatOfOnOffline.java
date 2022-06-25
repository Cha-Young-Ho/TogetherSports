package com.togethersports.tosproject.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ChatOfOnOffline {

    private String nickname;
    private Long id;
}
