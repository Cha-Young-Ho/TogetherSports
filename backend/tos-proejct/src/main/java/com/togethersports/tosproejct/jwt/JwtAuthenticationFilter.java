package com.togethersports.tosproejct.jwt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;

// 스프링 시큐리티에서 UsernamePasswordAuthenticationFilter가 존재한다.
// /login 요청해서 username, password 전송하면 (post)
// 해당 필터가 동작한다.


//public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
//
//    private final AuthenticationManager authenticationManager;
//
//    // /login 요청을 하면 로그인 시도를 위해서 실행되는 함수입니다.
//
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
//
//        log.info("attemptAuthentication 작동");
//
//
//        Authentication
//
//
//        // authenticationManager로 로그인 시도를 하면 PrincipalDetailsService가 호출된다.
//        // 그러면 loadUserByUsername이 자동으로 실행된다.
//
//        // 그 다음 principal을 세션에 담고 (이것을 담아야 권한관리가 된다.)
//        // jwt 토큰을 만들어서 응답해주면 된다.
//        return super.attemptAuthentication(request, response);
//    }


//해당 클래스는 JwtTokenProvider가 검증을 끝낸 Jwt로부터 유저 정보를 조회해와서 UserPasswordAuthenticationFilter 로 전달합니다.
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
 // jwt -> test

        //HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        //log.info("path = {}", httpServletRequest.getRequestURI());


        // 헤더에서 JWT 를 받아옵니다.
        String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);
        // 유효한 토큰인지 확인합니다.
        try {
            if (token != null && jwtTokenProvider.validateToken(token)) {
                log.info("filter 토큰 유효성 판단");
                // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옵니다.
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                // SecurityContext 에 Authentication 객체를 저장합니다.
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (org.json.simple.parser.ParseException e) {
            e.printStackTrace();
        }
        chain.doFilter(request, response);
    }
}