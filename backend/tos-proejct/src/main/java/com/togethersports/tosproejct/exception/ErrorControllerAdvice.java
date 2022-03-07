package com.togethersports.tosproejct.exception;

import com.togethersports.tosproejct.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@Slf4j
@RestControllerAdvice
public class ErrorControllerAdvice {

    @ExceptionHandler(value = NoSuchElementException.class)
    protected ResponseEntity<ErrorResponse> handleNoSuchElementException(Exception e) {

        log.info("NoSuch 시작");
        ErrorResponse response = new ErrorResponse();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }


}