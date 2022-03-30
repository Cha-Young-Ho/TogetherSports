package com.togethersports.tosproejct.common.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * <h1>FieldValidationError</h1>
 * <p>
 *     입력값 검증 실패시 검증 실패한 필드와, 제약조건을 나타내는 클래스
 * </p>
 * <ul>
 *     <li>field - 오류가 발생한 필드</li>
 *     <li>constraint - 해당 필드에 오류가 발생한 원인</li>
 * </ul>
 *
 * @author seunjeon
 */
@Setter
@Getter
public class FieldValidationError {

    private String field;
    private String constraint;

    // 필드와, 제약조건으로 객체 생성
    public static FieldValidationError of(String field, String constraint) {
        FieldValidationError updateError = new FieldValidationError();
        updateError.field = field;
        updateError.constraint = constraint;
        return updateError;
    }
}
