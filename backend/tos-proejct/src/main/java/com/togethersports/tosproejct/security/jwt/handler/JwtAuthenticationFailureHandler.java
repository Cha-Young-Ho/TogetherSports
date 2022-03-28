package com.togethersports.tosproejct.security.jwt.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.togethersports.tosproejct.common.dto.Response;
import com.togethersports.tosproejct.security.jwt.JwtErrorCode;
import com.togethersports.tosproejct.security.jwt.exception.AuthorizationHeaderNotFoundException;
import com.togethersports.tosproejct.security.jwt.exception.JwtExpiredTokenException;
import com.togethersports.tosproejct.security.jwt.exception.JwtModulatedTokenException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Objects;

/**
 * <h1>JwtAuthenticationFailureHandler</h1>
 * <p>
 *     JWT 인증 과정에서 예외 발생시 적절한 응답을 내려주는 핸들러
 * </p>
 * @author seunjeon
 */
@RequiredArgsConstructor
@Component
public class JwtAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        SecurityContextHolder.clearContext();
        Response<?> responseValue = null;
        if (exception instanceof AuthorizationHeaderNotFoundException) {
            // 인증 토큰 누락
            responseValue = Response.of(JwtErrorCode.TOKEN_NOTFOUND, null);
        } else if (exception instanceof JwtExpiredTokenException) {
            // 액세스 토큰 만료
            responseValue = Response.of(JwtErrorCode.ACCESS_TOKEN_EXPIRATION, null);
        } else if (exception instanceof JwtModulatedTokenException) {
            // 토큰 변조
            responseValue = Response.of(JwtErrorCode.TOKEN_MODULATED, null);
        }
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setHeader(HttpHeaders.CONTENT_ENCODING, "UTF-8");
        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        if (Objects.nonNull(responseValue)) {
            PrintWriter writer = response.getWriter();
            writer.write(objectMapper.writeValueAsString(responseValue));
        }
    }
}