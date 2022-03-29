package com.togethersports.tosproejct.security.jwt.filter;

import com.togethersports.tosproejct.security.jwt.exception.AuthorizationHeaderNotFoundException;
import com.togethersports.tosproejct.security.jwt.token.JwtPreAuthenticationToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

/**
 * <h1>JwtAuthenticationFilter</h1>
 * <p>
 *     인증이 필요한 요청이 들어올 경우 해당 필터가 JWT 토큰을 이용해 인증처리한다.
 * </p>
 * @author seunjeon
 */
@Slf4j
public class JwtAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";
    /**
     * 필터에 어떤 URL 로 요청이 들어왔을 때 처리할 것인지 설정할 수 있도록 {@link RequestMatcher} 타입을 받는 생성자
     * @param requiresAuthenticationRequestMatcher
     */
    public JwtAuthenticationFilter(RequestMatcher requiresAuthenticationRequestMatcher) {

        super(requiresAuthenticationRequestMatcher);
    }

    public JwtAuthenticationFilter(String request) {
        super(request);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        log.info("jwt auth 필터 작동");
        String authorizationHeader = request.getHeader(AUTHORIZATION_HEADER);

        // 인증 헤더가 없는 경우 예외 발생
        if (Objects.isNull(authorizationHeader)) {
            throw new AuthorizationHeaderNotFoundException("인증 헤더가 존재하지 않습니다.");
        }
        // Bearer 접두어 제거
        String token = authorizationHeader.substring(BEARER_PREFIX.length());

        JwtPreAuthenticationToken preAuthenticationToken = new JwtPreAuthenticationToken(token);
        return this.getAuthenticationManager().authenticate(preAuthenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authResult);
        SecurityContextHolder.setContext(context);
        chain.doFilter(request, response);
    }
}
