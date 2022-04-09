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

@Getter
@Builder
public class RoomOfUpdate {

@NotNull(message = "방 ID값이 누락되었습니다.")
private Long id;

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


@NotNull(message = "인원 제한을 설정해야 합니다.")
private int limitPeopleCount;


@NotNull(message = "이미지를 1개 이상 입력해야 합니다.")
private List<ImageOfRoomCRUD> roomImages;


@NotNull(message = "태그를 1개 이상 입력해야 합니다.")
private List<String> tag;


@NotNull(message = "시작 시간을 입력해야 합니다.")
@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
private LocalDateTime startAppointmentDate;


@NotNull(message = "끝나는 시간을 입력해야 합니다.")
@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
private LocalDateTime endAppointmentDate;

}
