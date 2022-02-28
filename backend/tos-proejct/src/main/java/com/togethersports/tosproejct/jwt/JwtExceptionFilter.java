package com.togethersports.tosproejct.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


//인증단계에서의 예외입니다. 만료된 토큰
@Slf4j
@RequiredArgsConstructor
public class JwtExceptionFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        response.setCharacterEncoding("utf-8");

        log.info("jwtExceptionFilter 실행");
        try{
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e){

            log.info("expiredJwtException 터짐");
            Map<String, String> map = new HashMap<>();

            map.put("errortype", "Forbidden");
            map.put("code", "402");
            map.put("message", "만료된 토큰입니다. Refresh 토큰이 필요합니다.");

            log.error("만료된 토큰");
            response.getWriter().write(objectMapper.writeValueAsString(map));

            log.info("생성된 response = {}", response);
        } catch (JwtException e){
            log.info("JwtException 터짐");
            Map<String, String> map = new HashMap<>();

            map.put("errortype", "Forbidden");
            map.put("code", "400");
            map.put("message", "변조된 토큰입니다. 로그인이 필요합니다.");

            log.error("변조된 토큰");
            response.getWriter().write(objectMapper.writeValueAsString(map));
        }
    }
}
