package com.togethersports.tosproejct.room.code;

import com.togethersports.tosproejct.common.code.ResponseCode;

/**
 * <h1>RoomCode</h1>
 * <p>
 *     방과 관련된 코드를 관리하는 Enum
 *
 * @author younghoCha
 */
public enum RoomCode implements ResponseCode {

    NOT_FOUND_ROOM(1200, "해당하는 방이 존재하지 않습니다."),
    FULL_ROOM(1201, "인원이 가득 찼습니다."),
    TIME_OUT_ROOM(1202, "시간이 지난 방");

    private final int code;
    private final String message;

    RoomCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public int getCode() {
        return this.code;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}

