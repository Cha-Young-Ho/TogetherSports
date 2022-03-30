package com.togethersports.tosproejct.common.controller;

import com.togethersports.tosproejct.common.code.CommonCode;
import com.togethersports.tosproejct.common.dto.FieldValidationError;
import com.togethersports.tosproejct.common.dto.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

/**
 * <h1>ExceptionControllerAdvice</h1>
 * <p>
 *    컨트롤러에서 발생한 예외 상황을 모두 처리하는 전역 컨트롤러
 * </p>
 * @author seunjeon
 */
@RestControllerAdvice
public class ExceptionControllerAdvice {

    /**
     * 입력값 검증 실패 시, 검증 실패 안내 및 실패한 필드, 메시지를 응답으로 담아 보낸다.
     * @param ex 검증 실패 오류
     * @return response - 검증 실패 필드, 메시지를 포함하는 응답
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Response<List<FieldValidationError>>> handleValidationError(BindException ex) {
        List<FieldValidationError> errors = ex.getFieldErrors().stream()
                .map(error -> FieldValidationError.of(error.getField(), error.getDefaultMessage()))
                .collect(Collectors.toList());
        return ResponseEntity.badRequest().body(Response.of(CommonCode.VALIDATION_FAIL, errors));
    }
}
