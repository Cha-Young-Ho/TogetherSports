package com.togethersports.tosproejct.myInfomationTest;

import com.togethersports.tosproejct.user.Admin;
import com.togethersports.tosproejct.user.Gender;
import com.togethersports.tosproejct.user.Provider;
import com.togethersports.tosproejct.user.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.util.List;

public class CustomUserMockSecurityContextFactory implements WithSecurityContextFactory<CustomUserMock> {

    @Override
    public SecurityContext createSecurityContext(CustomUserMock annotation) {
        String email = annotation.email();
        String role = annotation.role();



        User authUser = User.builder()
                .userName("이병건")
                .userState("1")
                .userBirth("19990101")
                .userNickname("침착맨")
                .gender(Gender.남)
                .provider(Provider.KAKAO)
                .locationX(12.12)
                .locationY(12.22)
                .admin(Admin.일반회원)
                .mannerPoint(10)
                .build();
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(authUser, "password", List.of(new SimpleGrantedAuthority(role)));
        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(token);
        return context;
    }
}
