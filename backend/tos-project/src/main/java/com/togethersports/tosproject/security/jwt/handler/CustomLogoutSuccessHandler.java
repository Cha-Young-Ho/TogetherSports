package com.togethersports.tosproject.security.jwt.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.togethersports.tosproject.common.code.CommonCode;
import com.togethersports.tosproject.common.dto.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * <h1>CustomLogoutSuccessHandler</h1>
 * <p>
 *     로그아웃 성공 시 동작하는 핸들러
 * </p>
 * @author seunjeon
 */
@Component
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {
    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Response<Void> logoutResponse = Response.of(CommonCode.GOOD_REQUEST, null);
        String responseBody = objectMapper.writeValueAsString(logoutResponse);
        response.setHeader(HttpHeaders.CONTENT_ENCODING, "UTF-8");
        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(responseBody);
    }
}
