package com.togethersports.tosproejct.account.dto;

import com.togethersports.tosproejct.account.Gender;
import lombok.*;

import java.util.List;

@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class UserOfOtherInfo {

    private String userNickname;
    private int mannerPoint;
    private Gender gender;
    private List<String> activeAreas;
    private List<String> interests;
    private String userProfileImage;



}

