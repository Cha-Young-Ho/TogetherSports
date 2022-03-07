package com.togethersports.tosproejct.exception;

import com.togethersports.tosproejct.code.Code;
import com.togethersports.tosproejct.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.security.SignatureException;
import java.util.NoSuchElementException;

@Slf4j
@RestControllerAdvice
public class ErrorControllerAdvice {

    @ExceptionHandler(value = NoSuchElementException.class)
    protected ResponseEntity<ErrorResponse> handleNoSuchElementException(Exception e) {

        log.info("NoSuch 시작");
        ErrorResponse response = new ErrorResponse(Code.BAD_REQUEST);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }

    @ExceptionHandler(value = UsernameNotFoundException.class)
    protected ResponseEntity<ErrorResponse> handleUserNameNotFoundException(){
        ErrorResponse response = new ErrorResponse(Code.BOARD_NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = CustomSignatureException.class)
    protected ResponseEntity<ErrorResponse> handleSignatureException(){
        ErrorResponse response = new ErrorResponse(Code.WRONG_TYPE_TOKEN);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }




}