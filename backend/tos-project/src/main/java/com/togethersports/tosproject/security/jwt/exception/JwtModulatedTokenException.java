package com.togethersports.tosproject.security.jwt.exception;

import org.springframework.security.core.AuthenticationException;

/**
 * <h1>JwtModulatedTokenException</h1>
 * <p>
 *     JWT 토큰이 변조된 경우 발생한다.
 * </p>
 * <p>
 *     토큰 발행 시 넣은 특정 클레임이 없거나 잘못된 서명, 혹은 JWT 구조 자체에 문제가 있는 경우에 발생한다.
 * </p>
 * @see io.jsonwebtoken.MalformedJwtException
 * @see io.jsonwebtoken.security.SignatureException
 * @see io.jsonwebtoken.MissingClaimException
 *
 * @author seunjeon
 */
public class JwtModulatedTokenException extends AuthenticationException {
    public JwtModulatedTokenException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public JwtModulatedTokenException(String msg) {
        super(msg);
    }
}
