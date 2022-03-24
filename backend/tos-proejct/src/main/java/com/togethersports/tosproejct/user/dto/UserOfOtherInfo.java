package com.togethersports.tosproejct.user.dto;

import com.togethersports.tosproejct.enums.Gender;
import com.togethersports.tosproejct.user.User;
import lombok.*;

import java.util.Optional;

@Builder
@ToString
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserOfOtherInfo {

    private String userNickname;
    private int mannerPoint;
    private Gender gender;

}
