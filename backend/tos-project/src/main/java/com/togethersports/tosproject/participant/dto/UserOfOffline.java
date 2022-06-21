package com.togethersports.tosproject.participant.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserOfOffline {

    private Long userId;
    private String userNickname;
}
