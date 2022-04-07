package com.togethersports.tosproejct.room.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;
/**
 * <h1>RoomOfCreate</h1>
 * <p>
 *     방 생성 관련 DTO
 * </p>
 * @author younghocha
 */

@Getter
@Builder
public class RoomOfCreate {


    @NotNull
    @Size(min = 1, max = 30, message = "최소 5글자 및 최대 30글자의 제목을 입력해야합니다.")
    @NotBlank
    private String roomTitle;

    @NotBlank
    @NotNull
    @Size(min = 5, message = "최소 5글자의 본문을 작성해야 합니다.")
    private String roomContent;

    @NotBlank
    @NotNull(message = "지역을 선택해야 합니다.")
    private String roomArea;

    @NotBlank
    @NotNull(message = "인원 제한을 설정해야 합니다.")
    @Size(min = 2, max = 100, message = "최소 2명, 최대 100명 까지 설정이 가능합니다.")
    private int limitPeopleCount;

    @NotBlank
    @NotNull(message = "이미지를 1개 이상 입력해야 합니다.")
    private List<ImageOfRoomCreate> images;

    @NotBlank
    @NotNull(message = "태그를 1개 이상 입력해야 합니다.")
    private List<String> tag;

    @NotBlank
    @NotNull(message = "시작 시간을 입력해야 합니다.")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime startAppointmentDate;

    @NotBlank
    @NotNull(message = "끝나는 시간을 입력해야 합니다.")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime endAppointmentDate;

    @NotBlank
    @NotNull(message = "운동 종목을 입력해야 합니다.")
    private String exercise;
}
