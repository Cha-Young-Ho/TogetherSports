package com.togethersports.tosproejct.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Code {

    //실패
    BAD_REQUEST(1000, "잘못된 요청입니다."),
    //유저 1100~ 1199
    USER_NOT_FOUND(1100, "유저를 찾을 수 없습니다."),

    //방 1200 ~ 1299
    BOARD_NOT_FOUND(1200, "해당 방을 찾을 수 없습니다."),


    //토큰 1300 ~ 1399
    UNKNOWN_ERROR(1300, "토큰이 존재하지 않습니다."),
    WRONG_TYPE_TOKEN(1301, "변조된 토큰입니다."),
    EXPIRED_TOKEN(1302, "만료된 토큰입니다."),
    ACCESS_DENIED(1303, "권한이 없습니다."),

    //성공 5000~
    GOOD_REQUEST(5000, "올바른 요청입니다.");

    private int code;
    private String message;


}