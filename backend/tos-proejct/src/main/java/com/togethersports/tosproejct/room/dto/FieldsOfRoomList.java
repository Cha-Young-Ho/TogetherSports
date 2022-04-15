package com.togethersports.tosproejct.room.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class FieldsOfRoomList {
    // 방 제목
    private String roomTitle;

    // 방 내용
    private String roomContent;

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
    private Integer participantCount;

    // 페이지
    private int page;

    // 입장마감된 방 보기 여부
    private boolean containNoAdmittance;
    // 시간마감된 방 보기 여부
    private boolean containTimeClosing;

}


