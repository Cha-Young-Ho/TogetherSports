package com.togethersports.tosproejct.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MessageOfParticipate {

    private Long participateUserId;
    private String participateUserNickname;

}
