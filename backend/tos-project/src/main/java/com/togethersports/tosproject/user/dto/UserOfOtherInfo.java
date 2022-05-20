package com.togethersports.tosproject.user.dto;

import com.togethersports.tosproject.area.ActiveArea;
import com.togethersports.tosproject.user.Gender;
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
    private List<ActiveArea> activeAreas;
    private List<String> interests;
    private String userProfileImagePath;

}

