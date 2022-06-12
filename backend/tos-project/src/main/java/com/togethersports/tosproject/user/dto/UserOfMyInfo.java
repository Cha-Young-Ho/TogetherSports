package com.togethersports.tosproject.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.togethersports.tosproject.area.ActiveArea;
import com.togethersports.tosproject.user.Gender;
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
    private List<ActiveArea> activeAreas;
    private List<String> interests;
    private String userProfileImagePath;
    private LocalDate userBirth;

    @JsonProperty(value = "isInformationRequired")
    private boolean isInformationRequired;


}
