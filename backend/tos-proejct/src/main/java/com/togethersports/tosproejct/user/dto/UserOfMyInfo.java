package com.togethersports.tosproejct.user.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.togethersports.tosproejct.security.oauth2.model.OAuth2Provider;
import com.togethersports.tosproejct.user.Gender;
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
    private String userProfileImage;
    private LocalDate userBirth;
    private OAuth2Provider oAuth2Provider;

    @JsonIgnore
    @JsonProperty(value = "isFirst")
    private boolean isFirst;
    @JsonProperty(value = "isInformationRequired")
    private boolean isInformationRequired;


}
