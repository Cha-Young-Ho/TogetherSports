package com.togethersports.tosproject.user.dto;

import com.togethersports.tosproject.area.ActiveArea;
import com.togethersports.tosproject.common.code.UploadType;
import com.togethersports.tosproject.user.Gender;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@Builder
public class UserOfModifyInfo {

    @NotNull
    @Size(min = 1, max = 5, message = "최소 1개 및 최대 5개의 관심 종목을 선택하여야 합니다.")
    private List<String> interests;

    @NotNull
    @Size(min = 1, max = 5, message = "최소 1개 및 최대 5개의 관심 종목을 선택하여야 합니다.")
    private List<ActiveArea> activeAreas;

    @NotNull(message = "닉네임 값이 누락되었습니다.")
    private String userNickname;

    private UserProfileImage userProfileImage;

    @NotNull(message = "생년월일이 누락되었습니다.")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate userBirth;

    @NotNull(message = "성별이 누락되었습니다.")
    private Gender gender;

    @Setter
    @Getter
    public static class UserProfileImage {
        private UploadType uploadType;
        private String userProfileExtension;
        private String imageSource;
    }


}
