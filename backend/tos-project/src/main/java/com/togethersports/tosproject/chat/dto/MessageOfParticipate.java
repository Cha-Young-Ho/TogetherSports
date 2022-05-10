package com.togethersports.tosproject.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MessageOfParticipate {

    private Long participateUserId;
    private String participateUserNickname;

}
