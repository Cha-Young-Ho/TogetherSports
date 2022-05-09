package com.togethersports.tosproject.common.code;

/**
 * <h1>CommonCode</h1>
 * <p>
 *     일반적인 요청 처리 성공 및 실패의 경우를 나타내는 Enum
 * </p>
 * <p>
 *     특별한 성공 코드가 없는 경우 {@link #GOOD_REQUEST} <br>
 *     입력값 검증 실패한 경우 {@link #VALIDATION_FAIL} <br>
 * </p>
 *
 * @author younghoCha
 * @author seunjeon
 */
public enum CommonCode implements ResponseCode {

    GOOD_REQUEST(5000, "올바른 요청입니다."),
    VALIDATION_FAIL(1001, "입력값 검증이 실패하였습니다."),
    BAD_REQUEST(1000, "잘못된 요청입니다.");
    private final int code;
    private final String message;

    CommonCode(int code, String message) {
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
