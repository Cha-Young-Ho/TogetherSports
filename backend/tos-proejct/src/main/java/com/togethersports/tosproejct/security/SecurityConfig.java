package com.togethersports.tosproejct.security;

import com.togethersports.tosproejct.security.jwt.RefreshTokenService;
import com.togethersports.tosproejct.security.jwt.filter.JwtAuthenticationFilter;
import com.togethersports.tosproejct.security.jwt.filter.JwtRefreshFilter;
import com.togethersports.tosproejct.security.jwt.handler.JwtAuthenticationFailureHandler;
import com.togethersports.tosproejct.security.jwt.provider.JwtAuthenticationProvider;
import com.togethersports.tosproejct.security.jwt.util.JwtTokenFactory;
import com.togethersports.tosproejct.security.oauth2.handler.OAuth2LoginAuthenticationSuccessHandler;
import com.togethersports.tosproejct.security.oauth2.service.CustomOAuth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;

import javax.servlet.Filter;

/**
 * <h1>SecurityConfig</h1>
 * <p>Spring Security 관련 설정 클래스</p>
 * <p>이 클래스는 다음 내용에 관한 설정을 담당한다.</p>
 * <ul>
 *     <li>사용자 권한에 따른 URL 보안 설정</li>
 *     <li>security filter 설정 및 필터체인 등록</li>
 * </ul>
 * @author seunjeon
 * @author yunghocha
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // OAuth2 Beans
    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;

    @Autowired
    private OAuth2LoginAuthenticationSuccessHandler oAuth2LoginAuthenticationSuccessHandler;



    /**
     *  jwt Beans
     */

    //Jwt Util
    @Autowired
    private JwtAuthenticationProvider jwtAuthenticationProvider;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private JwtTokenFactory jwtTokenFactory;

    //Jwt Refresh Filter

    public Filter jwtRefreshFilter() throws Exception{
        JwtRefreshFilter jwtRefreshFilter = new JwtRefreshFilter(refreshTokenService, jwtTokenFactory);


        return jwtRefreshFilter;
    }

    @Autowired
    private JwtAuthenticationFailureHandler jwtAuthenticationFailureHandler;
    public Filter jwtAuthenticationFilter() throws Exception{
        JwtAuthenticationFilter filter = new JwtAuthenticationFilter("/api/**");
        filter.setAuthenticationManager(super.authenticationManager());
        filter.setAuthenticationFailureHandler(jwtAuthenticationFailureHandler);
        return filter;
    }

    // authentication manager setting
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        super.configure(auth);
        auth.authenticationProvider(jwtAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin().disable();
        http.httpBasic().disable();
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // OAuth2 filter chain configuration
        http.oauth2Login()
                .successHandler(oAuth2LoginAuthenticationSuccessHandler)
                .userInfoEndpoint()
                .userService(customOAuth2UserService);
        /**
         * JWT
         */
        // JWT Authentication filter chain configuration
        http.addFilterBefore(jwtAuthenticationFilter(), OAuth2AuthorizationRequestRedirectFilter.class);
        http.addFilterBefore(jwtRefreshFilter(), JwtAuthenticationFilter.class);

        // URL security
        http.authorizeRequests()
                .antMatchers("/api/a").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/**").permitAll();



    }
}
