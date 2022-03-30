package com.togethersports.tosproejct.account.dto;

import com.togethersports.tosproejct.account.Gender;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class UserOfModifyInfo {

    private List<String> interests;

    private List<String> activeAreas;

    private String userNickname;

    private String userProfileImage;

    private LocalDate userBirth;

    private Gender gender;


}
