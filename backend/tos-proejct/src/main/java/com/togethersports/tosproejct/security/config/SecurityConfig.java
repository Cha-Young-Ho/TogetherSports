package com.togethersports.tosproejct.security.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.togethersports.tosproejct.security.jwt.JwtProperties;
import com.togethersports.tosproejct.security.jwt.handler.JwtTokenRenewalExceptionHandler;
import com.togethersports.tosproejct.security.jwt.service.JwtService;
import com.togethersports.tosproejct.security.jwt.service.RefreshTokenService;
import com.togethersports.tosproejct.security.jwt.filter.JwtAuthenticationFilter;
import com.togethersports.tosproejct.security.jwt.filter.JwtRefreshFilter;
import com.togethersports.tosproejct.security.jwt.handler.CustomLogoutHandler;
import com.togethersports.tosproejct.security.jwt.handler.JwtAuthenticationFailureHandler;
import com.togethersports.tosproejct.security.jwt.matcher.FilterSkipMatcher;
import com.togethersports.tosproejct.security.jwt.provider.JwtAuthenticationProvider;
import com.togethersports.tosproejct.security.jwt.util.JwtTokenFactory;
import com.togethersports.tosproejct.security.oauth2.handler.OAuth2LoginAuthenticationSuccessHandler;
import com.togethersports.tosproejct.security.oauth2.service.CustomOAuth2UserService;
import com.togethersports.tosproejct.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.expression.SecurityExpressionHandler;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.expression.DefaultWebSecurityExpressionHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.Filter;
import java.util.List;

/**
 * <h1>SecurityConfig</h1>
 * <p>Spring Security 관련 설정 클래스</p>
 * <p>이 클래스는 다음 내용에 관한 설정을 담당한다.</p>
 * <ul>
 *     <li>사용자 권한에 따른 URL 보안 설정</li>
 *     <li>security filter 설정 및 필터체인 등록</li>
 * </ul>
 *
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

    @Autowired
    private CustomLogoutHandler logoutHandler;

    // jwt beans
    @Autowired
    private JwtProperties jwtProperties;

    @Autowired
    private JwtTokenFactory jwtTokenFactory;

    @Autowired
    private JwtAuthenticationProvider jwtAuthenticationProvider;

    @Autowired
    private JwtAuthenticationFailureHandler jwtAuthenticationFailureHandler;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private JwtService<User> jwtService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtTokenRenewalExceptionHandler jwtTokenRenewalExceptionHandler;

    // jwt 갱신 필터
    public Filter jwtRefreshFilter() throws Exception {
        return new JwtRefreshFilter(refreshTokenService,
                jwtProperties,
                jwtService,
                objectMapper,
                new AntPathRequestMatcher("/api/refresh"),
                jwtTokenRenewalExceptionHandler);
    }

    // jwt 인증 필터
    public Filter jwtAuthenticationFilter() throws Exception {
        FilterSkipMatcher filterSkipMatcher = new FilterSkipMatcher(
                List.of("/api/refresh"),
                List.of("/api/**")
        );
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(filterSkipMatcher);
        jwtAuthenticationFilter.setAuthenticationManager(super.authenticationManager());
        jwtAuthenticationFilter.setAuthenticationFailureHandler(jwtAuthenticationFailureHandler);
        return jwtAuthenticationFilter;
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

        //logout
        http.logout()
                .logoutUrl("/api/logout")
                .addLogoutHandler(logoutHandler)
                .permitAll();

        // OAuth2 filter chain configuration
        http.oauth2Login()
                .successHandler(oAuth2LoginAuthenticationSuccessHandler)
                .userInfoEndpoint()
                .userService(customOAuth2UserService);

        // JWT Authentication filter chain configuration
        http.addFilterBefore(jwtAuthenticationFilter(), OAuth2AuthorizationRequestRedirectFilter.class);
        http.addFilterBefore(jwtRefreshFilter(), JwtAuthenticationFilter.class);

        // URL security
        http.authorizeRequests()
                .expressionHandler(expressionHandler())
                .antMatchers("/api/a").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/api/user").authenticated()
                .antMatchers("/api/room").authenticated();

        http.headers().frameOptions().disable();
    }

    // TODO nginx 를 이용한 배포시 포트 변경 필요할 수 있음
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // role hierarchy expression handler
    @Bean
    public SecurityExpressionHandler<FilterInvocation> expressionHandler() {
        DefaultWebSecurityExpressionHandler expressionHandler = new DefaultWebSecurityExpressionHandler();
        expressionHandler.setRoleHierarchy(roleHierarchy());
        return expressionHandler;
    }

    @Bean
    public RoleHierarchy roleHierarchy() {
        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
        roleHierarchy.setHierarchy("ROLE_USER > ROLE_ANONYMOUS");
        return roleHierarchy;
    }
}
