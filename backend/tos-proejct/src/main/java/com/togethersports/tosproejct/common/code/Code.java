package com.togethersports.tosproejct.common.code;

/**
 * <h1>Code</h1>
 * <p>
 *     일반적인 요청 처리 성공 및 실패의 경우를 나타내는 Enum
 * </p>
 * <p>
 *     특별한 성공 코드가 없는 경우 {@link #SUCCESS} <br>
 *     특별한 실패 코드가 없는 경우 {@link #FAIL} <br>
 *     입력값 검증 실패한 경우 {@link #VALIDATION_FAIL} <br>
 * </p>
 *
 * @author seunjeon
 */
public enum Code implements ResponseCode{
    SUCCESS(5000, "요청이 성공하였습니다."),
    FAIL(1000, "요청이 실패하였습니다."),
    VALIDATION_FAIL(1001, "입력값 검증이 실패하였습니다.");

    private final int code;
    private final String message;

    Code(int code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public int getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
