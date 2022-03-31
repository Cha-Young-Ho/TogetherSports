package com.togethersports.tosproejct.account.dto;

import com.togethersports.tosproejct.account.Gender;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class UserOfModifyInfo {

    @NotNull
    @Size(min = 1, max = 5, message = "최소 1개 및 최대 5개의 관심 종목을 선택하여야 합니다.")
    private List<String> interests;

    @NotNull
    @Size(min = 1, max = 5, message = "최소 1개 및 최대 5개의 관심 종목을 선택하여야 합니다.")
    private List<String> activeAreas;

    @NotNull(message = "닉네임 값이 누락되었습니다.")
    private String userNickname;

    private String userProfileImage;

    @NotNull(message = "생년월일이 누락되었습니다.")
    private LocalDate userBirth;

    @NotNull(message = "성별이 누락되었습니다.")
    private Gender gender;


}