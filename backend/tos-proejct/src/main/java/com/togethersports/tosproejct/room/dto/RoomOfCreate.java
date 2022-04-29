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
    @Size(min = 1, max = 20, message = "최소 5글자 및 최대 20글자의 제목을 입력해야합니다.")
    @NotBlank
    private String roomTitle;

    private String roomContent;

    @NotBlank
    @NotNull(message = "지역을 선택해야 합니다.")
    private String roomArea;


    @NotNull(message = "인원 제한을 설정해야 합니다.")
    private int limitPeopleCount;



    private List<ImageOfRoomCRUD> roomImages;


    @NotNull(message = "태그를 1개 이상 입력해야 합니다.")
    @Size(min = 1, message = "태그는 최소 1개 이상 최대 5개로 지정할 수 있습니다.")
    private List<String> tags;


    @NotNull(message = "시작 시간을 입력해야 합니다.")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime startAppointmentDate;


    @NotNull(message = "끝나는 시간을 입력해야 합니다.")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime endAppointmentDate;

    @NotBlank
    @NotNull(message = "운동 종목을 입력해야 합니다.")
    private String exercise;
}
