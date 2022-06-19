package com.togethersports.tosproject.security.jwt.matcher;

import org.springframework.http.HttpMethod;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.http.HttpServletRequest;

/**
 * <h1>LogoutRequestMatcher</h1>
 * <p>
 *     api 요청에서 로그아웃 요청을 판단하기 위한 RequestMatcher DELETE 메소드로 /api/logout 일 경우 처리하도록 한다.
 * </p>
 * @author seunjeon
 */
public class LogoutRequestMatcher implements RequestMatcher {

    private final AntPathRequestMatcher matcher;

    public LogoutRequestMatcher() {
        matcher = new AntPathRequestMatcher("/api/logout", HttpMethod.DELETE.name());
    }

    @Override
    public boolean matches(HttpServletRequest request) {
        return matcher.matches(request);
    }
}
