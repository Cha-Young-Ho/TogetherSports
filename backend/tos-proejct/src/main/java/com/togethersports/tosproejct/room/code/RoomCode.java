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
    TIME_OUT_ROOM(1202, "시간이 지난 방"),
    USER_OUT_FROM_ROOM(1203, "사용자 1명이 나갔습니다."),
    KICKED_OUT(1204, "사용자 1명이 강퇴당했습니다."),
    ENTER_USER_TO_ROOM(1205, "사용자 1명이 방에 입장했습니다."),
    CHAT(1206, "사용자 1명이 채팅을 보냈습니다."),
    CHANGED_ROOM_INFO(1207, "방 정보가 업데이트 되었습니다."),
    DELEGATE(1208, "방장이 위임되었습니다."),
    PARTICIPATE_ROOM(1209, "방에 참가 완료했습니다."),
    NOT_PARTICIPATE_ROOM(1210, "참가하지않은 방입니다.");

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

