package com.togethersports.tosproejct.security.jwt.service;

import com.togethersports.tosproejct.security.jwt.exception.JwtExpiredTokenException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

/**
 * <h1>JwtService</h1>
 * <p>
 * JWT 토큰과 관련된 기능을 제공하는 클래스
 * </p>
 * <ul>
 *     <li>{@link #createToken(String, long, ChronoUnit, Map)} JWT 토큰 생성하기</li>
 *     <li>{@link #verifyToken(String, String)} JWT 토큰 검증하기</li>
 *     <li>{@link #convertUserModel(Claims)} JWT 토큰 -> 사용자 엔티티 변환하기</li>
 *     <li>{@link #isRenewRequired(Date, long, ChronoUnit)} 토큰이 갱신 대상인지 확인</li>
 * </ul>
 *
 * @param <T> JWT 토큰 정보를 변환할 사용자 모델 엔티티 타입
 * @author seunjeon
 */
@RequiredArgsConstructor
@Service
public class JwtService<T> {

    private final Function<Claims, T> convertor;

    /**
     * JWT 토큰을 생성하여 반환한다. 토큰 생성 시의 서명 키, 만료 기간을 매개변수로 받으며 페이로드에 담을 내용은 claims 에 담는다.
     *
     * @param key      Base64 로 인코딩된 jwt 서명 키 값
     * @param expTime  토큰 만료 기간 값
     * @param timeUnit expTime 의 시간 단위
     * @param claims   jwt 에 담을 클레임 맵 (선택값으로 null 일 경우 페이로드를 정보를 담지 않는다.)
     * @return token 생성된 jwt 토큰 문자열
     */
    public String createToken(String key, long expTime, ChronoUnit timeUnit, Map<String, Object> claims) {
        Instant now = ZonedDateTime.now().toInstant();

        SecretKey secretkey = Keys.hmacShaKeyFor(Base64.getDecoder().decode(key.getBytes()));

        return Jwts.builder()
                .setExpiration(Date.from(now.plus(expTime, timeUnit)))
                .addClaims(claims)
                .signWith(secretkey)
                .compact();
    }

    /**
     * JWT 토큰 값 검증후 성공 시 페이로드의 값을 Claims 타입으로 반환한다.
     *
     * @param token 검증할 토큰 문자열
     * @param key   토큰이 해당 키로 서명된 것을 확인하기 위한 값
     * @return claims 페이로드 값
     * @throws SignatureException 서명이 잘못된 경우
     * @throws UnsupportedJwtException jwt 형식이 잘못된 경우
     * @throws IllegalArgumentException 토큰 값이 없는 경우
     * @throws MalformedJwtException 토큰이 올바른 jws 형식이 아닌 경우
     * @throws JwtExpiredTokenException 토큰이 만료된 경우 발생
     */
    public Claims verifyToken(String token, String key) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(Base64.getDecoder().decode(key.getBytes())))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * JWT 페이로드 정보를 서비스에서 제공하는 사용자 정보 객체로 변환한다.
     *
     * @param claims 사용자 정보가 담긴 claims 객체
     * @return T 제네릭으로 주어진 사용자 정보 모델 엔티티 객체
     */
    public T convertUserModel(Claims claims) {
        return convertor.apply(claims);
    }

    /**
     * 만료 시간을 기준으로 갱신이 필요한 상태인지 구분하여 t/f 로 반환한다.
     *
     * @param expTime  만료 시간
     * @param time     갱신 가능 시간
     * @param timeUnit 갱신 가능 시간 단위
     *                 (e.g time=3, timeUnit=ChronoUnit.DAYS 인 경우 만료 기간 3일 이내인 토큰에 대해 갱신이 필요하다고 판단하며 true 를 반환한다.
     * @return true : 갱신 필요, false : 갱신 불필요
     */
    public boolean isRenewRequired(Date expTime, long time, ChronoUnit timeUnit) {
        Instant exp = expTime.toInstant();
        Instant now = Instant.now();

        long diff = now.until(exp, timeUnit);

        return diff < time;
    }
}
