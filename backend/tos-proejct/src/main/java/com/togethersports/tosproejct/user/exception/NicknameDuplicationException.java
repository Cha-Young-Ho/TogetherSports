package com.togethersports.tosproejct.account.exception;

/**
 * <h1>NicknameDuplicationException</h1>
 * <p>
 *     닉네임이 중복되었을 경우 발생하는 예외
 * </p>
 *
 * @author younghoCha
 */
public class NicknameDuplicationException extends RuntimeException{
    public NicknameDuplicationException() {
        super();
    }

    public NicknameDuplicationException(String message) {
        super(message);
    }
}
