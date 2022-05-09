package com.togethersports.tosproject.user.dto;

import com.togethersports.tosproject.user.Gender;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

/**
 * <h1>UserOfInfoUpdate</h1>
 * <p>
 *    사용자 계정 추가정보 입력 dto
 * </p>
 */
@ToString
@Setter
@Getter
public class UserOfInitInfo {

    @NotNull
    @Size(min = 2, message = "최소 2자 이상이어야 합니다.")
    private String userNickname;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate userBirth;



    @NotNull
    private Gender gender;

    @NotNull
    @Size(max = 5)
    private List<String> activeAreas; // 관심 지역

    @NotNull
    @Size(min = 1, max = 5, message = "1~5개 사이의 운동 종목을 선택해야합니다.")
    private List<String> interests; // 관심 운동 종목


}
