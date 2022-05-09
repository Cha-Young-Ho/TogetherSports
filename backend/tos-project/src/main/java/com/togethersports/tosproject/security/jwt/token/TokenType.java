package com.togethersports.tosproject.security.jwt.token;

/**
 * <h1>TokenType</h1>
 * <p>
 * JWT 토큰의 타입을 나타내는 enum
 * </p>
 *
 * <ul>
 *     <li>{@link #ACCESS_TOKEN} : 액세스 토큰</li>
 *     <li>{@link #REFRESH_TOKEN} : 리프리쉐 토큰</li>
 * </ul>
 * @author seunjeon
 */
public enum TokenType {
    ACCESS_TOKEN,
    REFRESH_TOKEN;
}
