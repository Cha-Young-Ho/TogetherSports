package com.togethersports.tosproejct.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.togethersports.tosproejct.code.Code;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


//인증단계에서의 예외입니다. 만료된 토큰
@Slf4j
@RequiredArgsConstructor
public class JwtExceptionFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        response.setCharacterEncoding("utf-8");
        log.info("현재 uri = {}", request.getRequestURI());
        try{
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e){
            //만료 에러
            request.setAttribute("exception", Code.EXPIRED_TOKEN.getCode());
            filterChain.doFilter(request, response);

        } catch (MalformedJwtException e){

            //변조 에러
            request.setAttribute("exception", Code.WRONG_TYPE_TOKEN.getCode());
            filterChain.doFilter(request, response);


        } catch (SignatureException e){
            //형식, 길이 에러
            request.setAttribute("exception", Code.WRONG_TYPE_TOKEN.getCode());
            filterChain.doFilter(request, response);
        }
        log.info("exception filter 작동");



    }
}