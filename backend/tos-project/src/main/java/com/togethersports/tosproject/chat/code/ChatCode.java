package com.togethersports.tosproject.chat.code;


import com.togethersports.tosproject.common.code.ResponseCode;

public enum ChatCode implements ResponseCode {

    SYSTEM_USER_OUT("System", 0000, "유저 1명이 나갔습니다."),
    SYSTEM_USER_ENTER("System", 0000, "유저 1명이 참여했습니다."),
    SYSTEM_USER_KICKED_OUT("System", 0000, "유저 1명이 강퇴당했습니다."),
    SYSTEM_ROOM_UPDATED("Room",0000, "방 정보가 업데이트 되었습니다."),
    SYSTEM_USER_DELEGATED("User",0000, "방장이 위임되었습니다.");

    private final String type;
    private final int code;
    private final String message;

    ChatCode(String type, int code, String message){
        this.type = type;
        this.code = code;
        this.message = message;
    }

    public String getType(){
        return this.type;
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
