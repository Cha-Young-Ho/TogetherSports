package com.togethersports.tosproejct.security.jwt.util;

import com.togethersports.tosproejct.account.Account;
import com.togethersports.tosproejct.security.jwt.JwtProperties;
import com.togethersports.tosproejct.security.jwt.RefreshTokenRepository;
import com.togethersports.tosproejct.security.jwt.dto.TokenOfLogin;
import com.togethersports.tosproejct.security.jwt.token.RefreshToken;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * <h1>JwtTokenFactory</h1>
 * <p>
 * Jwt token 생성을 담당하는 클래스
 * </p>
 * <p>{@link #getAccessToken(Account)}} 엑세스 토큰 획득</p>
 * <p>{@link #createAccessToken(Account)} 액세스 토큰 생성</p>
 * <p>{@link #createRefreshToken(Account)} 리프레쉬 토큰 생성</p>
 * <p>{@link #createRefreshToken(Account)} ()} 리프레쉬 토큰 생성</p>
 *
 *
 * @author seunjeon
 * @author yunghocha
 */
@RequiredArgsConstructor
@Component
public class JwtTokenFactory {

    private final JwtProperties properties;

    /**
     * jwt 헤더를 생성한다. 토큰의 타입과 서명 알고리즘의 종류를 명시한다.
     *
     * @return header key, value 쌍
     */
    private Map<String, Object> createHeader() {
        // jwt header
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256");
        return header;
    }

    /**
     * 액세스 토큰을 획득한다. 토큰 만료기간 및 공통되는 값은 application-jwt.yml 의 값을 이용한다.
     *
     * @param account payload 에 담길 계정 정보
     * @return token 생성된 토큰 문자열
     */
    public String getAccessToken(Account account) {

        return createAccessToken(account);
    }

    // 엑세스 토큰과 리프레시 토큰을 생성한다.
    public TokenOfLogin createTokens(Account account) {


        //엑세스 토큰 생성
        String accessToken = createAccessToken(account);

        //리프레시 토큰 생성
        String refreshToken = createRefreshToken(account);


        return TokenOfLogin.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    /**
     * 액세스 토큰을 생성한다. 토큰 만료기간 및 공통되는 값은 application-jwt.yml 의 값을 이용한다.
     *
     * @param account payload 에 담길 계정 정보
     * @return token 생성된 토큰 문자열
     */
    private String createAccessToken(Account account){
        // jwt header setting
        Map<String, Object> header = createHeader();

        // jwt expiration time setting
        Instant now = Instant.now();

        // jwt access token claims setting
        Map<String, Object> payload = Map.of("email", account.getEmail()
                , "user", account.getId()
                , "role", account.getRole());

        return Jwts.builder()
                .setSubject(String.valueOf(account.getId()))
                .setIssuer(properties.getIssuer())
                .setExpiration(Date.from(now.plus(properties.getAccessTokenExpirationTime(), ChronoUnit.MINUTES)))
                .addClaims(payload)
                .signWith(Keys.hmacShaKeyFor(properties.getAccessTokenSigningKey().getBytes()))
                .compact();
    }

    private String createRefreshToken(Account account){
        // jwt header setting
        Map<String, Object> header = createHeader();

        // jwt expiration time setting
        Instant now = Instant.now();

        // jwt access token claims setting
        Map<String, Object> payload = Map.of("email", account.getEmail()
                , "user", account.getId()
                , "role", account.getRole());

        return Jwts.builder()
                .setSubject(String.valueOf(account.getId()))
                .setIssuer(properties.getIssuer())
                .setExpiration(Date.from(now.plus(properties.getAccessTokenExpirationTime(), ChronoUnit.MINUTES)))
                .signWith(Keys.hmacShaKeyFor(properties.getRefreshTokenSigningKey().getBytes()))
                .compact();
    }
}
