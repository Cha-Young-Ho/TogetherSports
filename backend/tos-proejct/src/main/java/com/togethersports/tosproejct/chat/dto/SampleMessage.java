package com.togethersports.tosproejct.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SampleMessage {

    private String target;
    private String msg;
}
