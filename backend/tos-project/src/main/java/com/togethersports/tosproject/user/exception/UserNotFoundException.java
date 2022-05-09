package com.togethersports.tosproject.user.exception;

/**
 * <h1>UserNotFoundException</h1>
 * <p>
 *     사용자 계정을 찾지 못하는 경우 발생하는 예외
 * </p>
 * <p>
 *     비슷한 예외가 spring 에 정의된 것이 많으나 별도의 예외 처리를 위해 정의함
 * </p>
 *
 * @author seunjeon
 */
public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException() {
        super();
    }

    public UserNotFoundException(String message) {
        super(message);
    }
}
