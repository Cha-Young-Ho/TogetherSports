package com.togethersports.tosproejct.account.dto;


import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserOfMyInfoSummary {

    private String userNickname;
    private String userProfileImage;

}
