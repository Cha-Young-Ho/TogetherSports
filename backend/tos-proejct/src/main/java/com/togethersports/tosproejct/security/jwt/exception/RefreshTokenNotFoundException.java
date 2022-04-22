package com.togethersports.tosproejct.security.jwt.exception;

/**
 * <h1>RefreshTokenNotFoundException</h1>
 * <p>
 *     리프레쉬 토큰이 DB 에 존재하지 않을 경우 발생
 * </p>
 * @author seunjeon
 */
public class RefreshTokenNotFoundException extends RuntimeException {
    public RefreshTokenNotFoundException() {
    }

    public RefreshTokenNotFoundException(String message) {
        super(message);
    }
}
