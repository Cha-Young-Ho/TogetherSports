package com.togethersports.tosproject.user.dto;

import com.togethersports.tosproject.area.ActiveArea;
import com.togethersports.tosproject.mannerpoint.MannerPointStatus;
import com.togethersports.tosproject.user.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class UserOfParticipantInfo {
    private Long id;
    private String userNickname;
    private int mannerPoint;
    private Gender gender;
    private List<ActiveArea> activeAreas;
    private List<String> interests;
    private String userProfileImagePath;

}