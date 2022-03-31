package com.togethersports.tosproejct.account.dto;

import com.togethersports.tosproejct.account.Gender;
import com.togethersports.tosproejct.security.oauth2.model.OAuth2Provider;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class UserOfMyInfo {

    private String userEmail;
    private String userNickname;
    private Gender gender;
    private int mannerPoint;
    private Long id;
    private List<String> activeAreas;
    private List<String> interests;
    private String image;
    private LocalDate userBirth;
    private OAuth2Provider oAuth2Provider;
    private boolean isFirst;


}
