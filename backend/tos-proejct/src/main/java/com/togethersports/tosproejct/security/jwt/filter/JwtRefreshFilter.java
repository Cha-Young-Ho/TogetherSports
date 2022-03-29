package com.togethersports.tosproejct.security.jwt.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.togethersports.tosproejct.common.CommonCode;
import com.togethersports.tosproejct.common.dto.Response;
import com.togethersports.tosproejct.security.jwt.JwtProperties;
import com.togethersports.tosproejct.security.jwt.RefreshTokenService;
import com.togethersports.tosproejct.security.jwt.dto.TokenOfLogin;
import com.togethersports.tosproejct.security.jwt.exception.JwtExpiredTokenException;
import com.togethersports.tosproejct.security.jwt.exception.JwtModulatedTokenException;
import com.togethersports.tosproejct.security.jwt.token.RefreshToken;
import com.togethersports.tosproejct.security.jwt.util.JwtDecoder;
import com.togethersports.tosproejct.security.jwt.util.JwtTokenFactory;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.MissingClaimException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Objects;


@Slf4j
@RequiredArgsConstructor
@Component
public class JwtRefreshFilter extends OncePerRequestFilter {

    @Autowired
    private final RefreshTokenService refreshTokenService;

    @Autowired
    private JwtProperties jwtProperties;

    @Autowired
    private final JwtTokenFactory jwtTokenFactory;

    private ObjectMapper objectMapper = new ObjectMapper();



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if (request.getRequestURI().equals("/api/refresh")) {
            // Request 토큰 추출
            ServletInputStream inputStream = request.getInputStream();
            Map<String, String> map = objectMapper.readValue(StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8), Map.class);
            String refreshToken = map.get("refresh");

            log.info("refresh = {}", refreshToken);


            try {
                TokenOfLogin tokenOfLogin = checkRefreshToken(refreshToken);

                parsingResponse(tokenOfLogin, response);
            } catch (SignatureException | MalformedJwtException | MissingClaimException ex) {
                throw new JwtModulatedTokenException("변조된 JWT 토큰입니다.");
            } catch (ExpiredJwtException ex) {
                throw new JwtExpiredTokenException("만료된 JWT 토큰입니다.");
            }




        }


        filterChain.doFilter(request, response);

    }

    public JwtDecoder getJwtDecoder(){
        return new JwtDecoder(this.jwtProperties);
    }

    public TokenOfLogin checkRefreshToken(String refreshToken){
        //true일 경우 새로운 refreshToken 생성 필요
        if(getJwtDecoder().verifyRefreshToken(refreshToken)){
            // 기존의 refresh Token 조회
            RefreshToken savedRefreshToken =
                    refreshTokenService.getRefreshToken(refreshToken);

            // 새로운 refresh Token 생성
            String newRefreshToken = jwtTokenFactory.createRefreshToken();

            // 새로운 refresh Token Entity 생성
            RefreshToken newRefreshTokenEntity = RefreshToken.
                    createRefreshToken(
                            savedRefreshToken.getAccountEmail(),
                            savedRefreshToken.getAccountId(),
                            newRefreshToken,
                            savedRefreshToken.getRole()
                    );


            // 기존의 refresh Token 삭제
            refreshTokenService.removeRefreshToken(savedRefreshToken.getId());

            // 새로운 refresh Token 저장
            refreshTokenService.renewalRefreshToken(newRefreshTokenEntity);

            // Access Token 생성
            String newAccessToken = jwtTokenFactory.createAccessToken(newRefreshTokenEntity);

            // token 객체 생성 및 리턴
            return TokenOfLogin.builder()
                    .accessToken(newAccessToken)
                    .refreshToken(newRefreshToken)
                    .build();
        }

        // false일 경우 기존 refresh Token 유지
        // 기존의 refresh Token 조회
        RefreshToken savedRefreshToken =
                refreshTokenService.getRefreshToken(refreshToken);

        // Access Token 생성
        String newAccessToken = jwtTokenFactory.createAccessToken(savedRefreshToken);

        // token 객체 생성 (access, refresh)
        // token 객체 리턴

        return TokenOfLogin.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public void parsingResponse(TokenOfLogin tokenOfLogin, HttpServletResponse response) throws IOException {
        Response<TokenOfLogin> responseValue = Response.of(CommonCode.GOOD_REQUEST, tokenOfLogin);
        response.setStatus(HttpStatus.OK.value());
        response.setHeader(HttpHeaders.CONTENT_ENCODING, "UTF-8");
        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        if (Objects.nonNull(responseValue)) {
            PrintWriter writer = response.getWriter();
            writer.write(objectMapper.writeValueAsString(responseValue));
        }

        log.info("parsing 중~");

    }








}
