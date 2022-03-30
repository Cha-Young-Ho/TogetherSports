package com.togethersports.tosproejct.account.dto;

import com.togethersports.tosproejct.account.Gender;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@Builder
@RequiredArgsConstructor
public class UserOfOtherInfo {

    private String userNickname;
    private int mannerPoint;
    private Gender gender;

}
