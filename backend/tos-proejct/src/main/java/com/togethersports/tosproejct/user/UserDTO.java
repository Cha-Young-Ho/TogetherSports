package com.togethersports.tosproejct.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.togethersports.tosproejct.userProfileImage.UserProfileImageDTO;
import lombok.*;

@Data // @Getter + Constructor로 바꿔야함
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    // User
    private int userSequenceId;
    private String userEmail;
    private String userName;
    private String userNickname;
    private String userBirthYear;
    private String userBirthMonth;
    private String userBirthDay;
    private Gender gender;
    private Admin admin;
    private Provider provider;

    @JsonProperty("userProfileImage")
    private UserProfileImageDTO userProfileImage;
}

// 스프링 부트 / 스프링 시큐리티 -> 스프링 시큐리티

//스프링시큐리티(필터체인) -> 각종 필터 작동 -> 스프링 부트(컨트롤러)

// login url -> id pw 받게끔 <- 스프링까지 안감 /login
