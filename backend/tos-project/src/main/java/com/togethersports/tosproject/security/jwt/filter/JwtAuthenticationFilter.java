package com.togethersports.tosproject.security.jwt.filter;

import com.togethersports.tosproject.security.jwt.token.JwtPreAuthenticationToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

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

    // JWT 인증 필터를 통과할지 여부를 RequestMatcher 를 통해 결정하도록 하기 위해 RequestMatcher 를 받는 생성자
    public JwtAuthenticationFilter(RequestMatcher requestMatcher) {
        super(requestMatcher);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {

        String authorizationHeader = request.getHeader(AUTHORIZATION_HEADER);

        // 인증 헤더가 없는 경우 익명 사용자로 간주 (Anonymous Authentication)
        if (Objects.isNull(authorizationHeader)) {

            return new AnonymousAuthenticationToken(UUID.randomUUID().toString(),
                    "anonymous",
                    List.of(new SimpleGrantedAuthority("ROLE_ANONYMOUS")));
        }
        // Bearer 접두어 제거
        String token = authorizationHeader.substring(BEARER_PREFIX.length());

        JwtPreAuthenticationToken preAuthenticationToken = new JwtPreAuthenticationToken(token);
        return this.getAuthenticationManager().authenticate(preAuthenticationToken);
    }

    // 인증 성공 후 추가 작업
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authResult);
        SecurityContextHolder.setContext(context);
        chain.doFilter(request, response);
    }
}
