package com.togethersports.tosproject.security.jwt.filter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.togethersports.tosproject.common.code.CommonCode;
import com.togethersports.tosproject.common.dto.Response;
import com.togethersports.tosproject.security.jwt.JwtProperties;
import com.togethersports.tosproject.security.jwt.dto.TokenOfRenew;
import com.togethersports.tosproject.security.jwt.exception.JwtExpiredTokenException;
import com.togethersports.tosproject.security.jwt.exception.JwtModulatedTokenException;
import com.togethersports.tosproject.security.jwt.exception.RefreshTokenNotFoundException;
import com.togethersports.tosproject.security.jwt.handler.JwtTokenRenewalExceptionHandler;
import com.togethersports.tosproject.security.jwt.model.RefreshToken;
import com.togethersports.tosproject.security.jwt.service.JwtService;
import com.togethersports.tosproject.security.jwt.service.RefreshTokenService;
import com.togethersports.tosproject.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.MissingClaimException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.StreamUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * <h1>JwtRefreshFilter</h1>
 * <p>
 * Access Token 갱신 담당 필터
 * </p>
 *
 * @author younghoCha
 */
@Slf4j
@RequiredArgsConstructor
public class JwtRefreshFilter extends OncePerRequestFilter {

    private final RefreshTokenService refreshTokenService;
    private final JwtProperties jwtProperties;
    private final JwtService<User> jwtService;
    private final ObjectMapper objectMapper;
    private final RequestMatcher requestMatcher;
    private final JwtTokenRenewalExceptionHandler jwtTokenRenewalExceptionHandler;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("uri = {}", request.getRequestURI());
        if (requestMatcher.matches(request)) {



            ServletInputStream is = request.getInputStream();
            String body = StreamUtils.copyToString(is, StandardCharsets.UTF_8);
            JsonNode jsonNode = objectMapper.readTree(body);

            try {
                String refreshToken = jsonNode.get("refreshToken").asText();

                Claims claims = jwtService.verifyToken(refreshToken, jwtProperties.getRefreshTokenSigningKey());

                Date exp = claims.getExpiration();

                RefreshToken findRefreshToken = refreshTokenService.findByToken(refreshToken);

                String newAccessToken = jwtService.createToken(jwtProperties.getAccessTokenSigningKey(),
                        jwtProperties.getAccessTokenExpirationTime(),
                        ChronoUnit.MINUTES,
                        createUserPayload(findRefreshToken.getUser())
                );
                String newRefreshToken = refreshToken;
                // 리프레쉬 토큰 만료가 3일이하로 남은경우 리프레쉬 토큰도 갱신 처리
                if (jwtService.isRenewRequired(exp, 3, ChronoUnit.DAYS)) {
                    newRefreshToken = jwtService.createToken(jwtProperties.getRefreshTokenSigningKey(),
                            jwtProperties.getRefreshTokenExpirationTime(),
                            ChronoUnit.DAYS,
                            null
                    );

                    refreshTokenService.renewRefreshToken(findRefreshToken, newRefreshToken);
                }

                // 성공 시의 응답
                response.setStatus(HttpStatus.OK.value());
                response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
                response.setHeader(HttpHeaders.CONTENT_ENCODING, "UTF-8");

                TokenOfRenew tokens = new TokenOfRenew();
                tokens.setAccessToken(newAccessToken);
                tokens.setRefreshToken(newRefreshToken);

                response.getWriter().write(objectMapper.writeValueAsString(Response.of(CommonCode.GOOD_REQUEST, tokens)));

                // 요청 본문에 토큰이 없거나 토큰 자체의 문제가 있는 경우 또는 DB 에 없는 리프레쉬 토큰의 경우 예외 처리 핸들러에서 응답 처리
            } catch (RefreshTokenNotFoundException | NullPointerException e) {
                jwtTokenRenewalExceptionHandler.onRenewalFailure(request, response, e);

            } catch (SignatureException | MalformedJwtException | MissingClaimException ex) {
                jwtTokenRenewalExceptionHandler.onRenewalFailure(request, response, new JwtModulatedTokenException("변조된 JWT 토큰 입니다."));

            } catch (ExpiredJwtException ex) {
                jwtTokenRenewalExceptionHandler.onRenewalFailure(request, response, new JwtExpiredTokenException("만료된 JWT 토큰 입니다."));
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }

    /**
     * JWT 토큰에 들어갈 페이로드 정보를 반환한다.
     *
     * @param user 페이로드에 들어갈 사용자 정보가 있는 도메인 객체
     * @return payload
     */
    public Map<String, Object> createUserPayload(User user) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("sub", user.getId());
        payload.put("email", user.getEmail());
        payload.put("role", user.getRole());
        return payload;
    }
}
