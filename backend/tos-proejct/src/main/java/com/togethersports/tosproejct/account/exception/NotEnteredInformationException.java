package com.togethersports.tosproejct.account.exception;

/**
 * <h1>NotEnteredInformationException</h1>
 * <p>
 *     추가 정보를 입력하지 않았을 경우 발생하는 예외
 * </p>
 *
 * @author younghoCha
 */
public class NotEnteredInformationException extends RuntimeException{
    public NotEnteredInformationException() {
        super();
    }

    public NotEnteredInformationException(String message) {
        super(message);
    }
}
