package com.togethersports.tosproject.common.dto;

import com.togethersports.tosproject.chat.code.ChatCode;
import lombok.Getter;
import lombok.Setter;

/**
 * <h1>Response</h1>
 * <p>HTTP 요청 응답 객체</p>
 * @param <T> 본문에 들어갈 객체 타입 (json 으로 변환될 대상)
 */
@Setter
@Getter
public class WsResponse<T> {

    // 요청 처리 후 추가 메시지에 대한 내용
    private Status status;

    private T content;

    @Getter
    @Setter
    private static class Status {
        private String type;
        private int code;
        private String message;
    }

    /**
     * 응답 코드와 내용으로 응답 객체를 생성한다.
     * @param chatCode 응답코드, 메시지를 가지는 ResponseCode 구현체
     * @param content 본문 내용
     * @return response 본문 전체 객체
     */
    public static<T> WsResponse<T> of(ChatCode chatCode, T content) {
        WsResponse<T> response = new WsResponse<>();

        Status status = new Status();
        status.setCode(chatCode.getCode());
        status.setMessage(chatCode.getMessage());
        status.setType(chatCode.getType());

        response.setStatus(status);
        response.setContent(content);

        return response;
    }
}
