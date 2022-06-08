package com.togethersports.tosproject.mannerpoint.code;

import com.togethersports.tosproject.common.code.ResponseCode;

public enum MannerPointCode implements ResponseCode {

        FAIL_MANNER_POINT_UP(1105, "이미 매너지수를 올려서 올릴 수 없습니다."),
        FAIL_MANNER_POINT_DOWN(1106, "이미 매너지수를 내려서 내릴 수 없습니다."),
        CANCEL_MANNER_POINT_UP(1107, "올렸던 매너지수가 취소되었습니다."),
        CANCEL_MANNER_POINT_DOWN(1108, "내렸던 매너지수가 취소되었습니다."),
        MANNER_POINT_UP(1109, "매너지수를 올렸습니다."),
        MANNER_POINT_DOWN(1110, "매너지수를 내렸습니다."),
        FAIL_SELF_MANNER_POINT(1111, "자기 자신의 매너지수는 올리거나 내릴 수 없습니다.");

        private final int code;
        private final String message;

        MannerPointCode(int code, String message) {
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
