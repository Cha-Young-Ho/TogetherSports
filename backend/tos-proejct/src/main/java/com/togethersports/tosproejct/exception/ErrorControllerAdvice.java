package com.togethersports.tosproejct.exception;

import com.togethersports.tosproejct.code.Code;
import com.togethersports.tosproejct.response.DefaultResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@Slf4j
@RestControllerAdvice
public class ErrorControllerAdvice {

    @ExceptionHandler(value = NoSuchElementException.class)
    protected ResponseEntity<DefaultResponse> handleNoSuchElementException(Exception e) {

        log.info("NoSuch 시작");
        DefaultResponse response = new DefaultResponse(Code.BAD_REQUEST);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }

    @ExceptionHandler(value = UsernameNotFoundException.class)
    protected ResponseEntity<DefaultResponse> handleUserNameNotFoundException(){
        DefaultResponse response = new DefaultResponse(Code.BOARD_NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = CustomSignatureException.class)
    protected ResponseEntity<DefaultResponse> handleSignatureException(){
        DefaultResponse response = new DefaultResponse(Code.WRONG_TYPE_TOKEN);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }




}