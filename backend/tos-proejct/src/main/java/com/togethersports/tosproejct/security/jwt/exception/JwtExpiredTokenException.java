package com.togethersports.tosproejct.security.jwt.exception;

import org.springframework.security.core.AuthenticationException;

/**
 * <h1></h1>
 */
public class JwtExpiredTokenException extends AuthenticationException {

    public JwtExpiredTokenException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public JwtExpiredTokenException(String msg) {
        super(msg);
    }
}
