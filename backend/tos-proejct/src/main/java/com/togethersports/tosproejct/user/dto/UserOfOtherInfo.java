package com.togethersports.tosproejct.user.dto;

import com.togethersports.tosproejct.user.Gender;
import lombok.*;

import java.util.List;

@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class UserOfOtherInfo {
    private Long id;
    private String userNickname;
    private int mannerPoint;
    private Gender gender;
    private List<String> activeAreas;
    private List<String> interests;
    private String userProfileImagePath;

}

