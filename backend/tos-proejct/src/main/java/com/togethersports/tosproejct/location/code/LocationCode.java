package com.togethersports.tosproejct.location.code;

import com.togethersports.tosproejct.common.code.ResponseCode;

/**
 * <h1>LocationCode</h1>
 * <p>
 *     행정구역 API 호출의 특수한 경우의 결과를 나타내는 enum
 * </p>
 * <p>
 *     해당 행정구역이 없거나 하위 행정구역이 없는 경우 {@link #CHILD_NOT_FOUND}
 * </p>
 * @author seunjeon
 */
public enum LocationCode implements ResponseCode {

    CHILD_NOT_FOUND(1400, "해당 행정구역이 없거나 하위 행정구역이 없습니다.");

    private final int code;
    private final String message;

    LocationCode(int code, String message) {
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
