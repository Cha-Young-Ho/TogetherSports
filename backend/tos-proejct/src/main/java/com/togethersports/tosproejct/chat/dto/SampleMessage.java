package com.togethersports.tosproejct.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SampleMessage {

    private Long userId;
    private Long roomId;
    private String target;
    private String message;
}
