package com.togethersports.tosproejct.security.jwt.exception;

import org.springframework.security.core.AuthenticationException;

/**
 * <h1>AuthorizationHeaderNotFoundException</h1>
 * <p>
 *     http header 에 Authorization 값이 없는 경우 발생하는 예외
 * </p>
 * @author seunjeon
 */
public class AuthorizationHeaderNotFoundException extends AuthenticationException {

    public AuthorizationHeaderNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public AuthorizationHeaderNotFoundException(String msg) {
        super(msg);
    }
}
