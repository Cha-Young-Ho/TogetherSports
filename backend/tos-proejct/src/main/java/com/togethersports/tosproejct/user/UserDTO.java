package com.togethersports.tosproejct.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.togethersports.tosproejct.enums.Admin;
import com.togethersports.tosproejct.enums.Gender;
import com.togethersports.tosproejct.enums.Provider;
import com.togethersports.tosproejct.userProfileImage.UserProfileImageDTO;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data // @Getter + Constructor로 바꿔야함
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {


    @NotBlank(message = "email 필드 값이 존재하지 않습니다.")
    @Email
    private String userEmail;
    @NotBlank(message = "userName 필드 값이 존재하지 않습니다.")
    private String userName;
    @NotBlank(message = "userNickname 필드 값이 존재하지 않습니다.")
    private String userNickname;
    @NotBlank(message = "userBirthYear 필드 값이 존재하지 않습니다.")
    private String userBirthYear;
    @NotBlank(message = "userBirthMonth 필드 값이 존재하지 않습니다.")
    private String userBirthMonth;
    @NotBlank(message = "userBirthDay 필드 값이 존재하지 않습니다.")
    private String userBirthDay;

    private Gender gender;
    private Provider provider;

    private List<String> activeAreas;
    private List<String> interests;

    @JsonProperty("userProfileImage")
    private UserProfileImageDTO userProfileImage;

}

// 스프링 부트 / 스프링 시큐리티 -> 스프링 시큐리티

//스프링시큐리티(필터체인) -> 각종 필터 작동 -> 스프링 부트(컨트롤러)

// login url -> id pw 받게끔 <- 스프링까지 안감 /login
