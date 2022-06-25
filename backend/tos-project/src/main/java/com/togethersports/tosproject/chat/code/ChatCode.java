package com.togethersports.tosproject.chat.code;


import com.togethersports.tosproject.common.code.ResponseCode;
/**
 * <h1>ChatCode</h1>
 * <p>
 *     WS에 관련된 Response를 관리하는 Code Enum
 * </p>
 * @author younghoCha
 */
public enum ChatCode implements ResponseCode {

    SYSTEM_USER_OUT("System", 1502, "유저 1명이 나갔습니다."),
    SYSTEM_USER_ENTER("System", 1501, "유저 1명이 참여했습니다."),
    SYSTEM_USER_KICKED_OUT("System", 1503, "유저 1명이 강퇴당했습니다."),
    ROOM_UPDATED("Room",1505, "방 정보가 업데이트 되었습니다."),
    SYSTEM_USER_DELEGATED("System",1504, "방장이 위임되었습니다."),
    USER_CHAT_PUBLISH("User", 1506, "유저 1명이 채팅을 보냈습니다."),
    SYSTEM_HOST_OUT("System", 1507, "방장이 방을 나갔습니다."),
    SYSTEM_USER_ONLINE("System", 1508, "유저 1명이 온라인이 되었습니다."),
    SYSTEM_USER_OFFLINE("System", 1509, "유저 1명이 오프라인이 되었습니다.");

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
