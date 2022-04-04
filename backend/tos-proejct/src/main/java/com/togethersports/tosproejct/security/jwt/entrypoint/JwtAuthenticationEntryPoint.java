package com.togethersports.tosproejct.security.jwt.entrypoint;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.togethersports.tosproejct.common.dto.Response;
import com.togethersports.tosproejct.security.jwt.JwtErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * JWT 인증 예외 발생 시 응답을 처리하도록 {@link org.springframework.security.web.access.ExceptionTranslationFilter} 가 사용한다.<br>
 * 인증 예외 발생 시 {@link #commence(HttpServletRequest, HttpServletResponse, AuthenticationException)} 메소드가 호출 되어 http 응답을 처리한다.<br>
 * 이 클래스는 인증 필요성을 사용자에게 응답하기 때문에 JWT 를 적용한 현재 시스템의 JWT 인증 작업의 시작점이 된다.<br>
 * @author seunjeon
 */
@RequiredArgsConstructor
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setHeader(HttpHeaders.CONTENT_ENCODING, "UTF-8");
        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

        Response<?> responseValue = Response.of(JwtErrorCode.TOKEN_NOTFOUND, null);
        PrintWriter writer = response.getWriter();
        writer.write(objectMapper.writeValueAsString(responseValue));
    }
}
