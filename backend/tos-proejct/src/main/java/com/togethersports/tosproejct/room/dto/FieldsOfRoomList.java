package com.togethersports.tosproejct.room.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class FieldsOfRoomList {

    // 필터를 적용했는지 확인하는 필드
    private boolean filter;

    // 종목
    private List<String> interest;

    // 지역
    private String area;

    // 시간
    private List<String> time;

    // 사용자 지정 시작 시간
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime customTimeStart;

    // 사용자 지정 끝 시간
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime customTimeEnd;

    // 검색 키워드
    private String keyWord;

    // 입장 가능 인원
    private int participantCount;

    // 페이지
    private int page;
}
