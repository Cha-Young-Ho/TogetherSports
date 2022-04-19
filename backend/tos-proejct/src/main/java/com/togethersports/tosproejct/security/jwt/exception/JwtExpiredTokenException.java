package com.togethersports.tosproejct.security.jwt.exception;

import org.springframework.security.core.AuthenticationException;

/**
 * <h1>JwtExpiredTokenException</h1>
 * <p>
 *     JWT 토큰 만료 시 발생한다.
 * </p>
 * @author seunjeon
 * @see io.jsonwebtoken.ExpiredJwtException
 */
public class JwtExpiredTokenException extends AuthenticationException {

    public JwtExpiredTokenException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public JwtExpiredTokenException(String msg) {
        super(msg);
    }
}
