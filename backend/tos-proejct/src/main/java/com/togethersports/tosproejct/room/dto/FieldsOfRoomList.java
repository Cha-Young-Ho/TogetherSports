package com.togethersports.tosproejct.room.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class FieldsOfRoomList {

    // 종목
    private List<String> exercise;

    // 지역
    private List<String> area;

    // 사용자 지정 시작 시간
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime startAppointmentDate;

    // 사용자 지정 끝 시간
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime endAppointmentDate;

    // 검색 키워드
    private String keyWord;

    // 입장 가능 인원
    private int participantCount;

    // 페이지
    private int page;
}

//http://localhost:8080/api/room?exercise=축구,농구,골프&startAppointmentDate=2021-01-03T12:11&endAppointmentDate=2021-02-04T12:30&page=0&size=20&sort=id,DESC
