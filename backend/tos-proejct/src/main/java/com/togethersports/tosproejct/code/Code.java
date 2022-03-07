package com.togethersports.tosproejct.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Code {

    INDEX_NOT_FOUND(1001, "인덱스가 존재하지 않습니다."),
    BOARD_NOT_FOUND(1002, "게시글을 찾을 수 없습니다."),
    UNKNOWN_ERROR(1003, "토큰이 존재하지 않습니다."),
    WRONG_TYPE_TOKEN(1004, "변조된 토큰입니다."),
    EXPIRED_TOKEN(1005, "만료된 토큰입니다."),
    UNSUPPORTED_TOKEN(1006, "변조된 토큰입니다."),
    ACCESS_DENIED(1007, "권한이 없습니다."),
    USER_NOT_FOUND(1008, "유저를 찾을 수 없습니다."),
    BAD_REQUEST(1009, "잘못된 요청입니다."),
    CONSTRAINT_ERROR(1101, "무결성 제약 조건에 위배됩니다.");


    private int code;
    private String message;
}