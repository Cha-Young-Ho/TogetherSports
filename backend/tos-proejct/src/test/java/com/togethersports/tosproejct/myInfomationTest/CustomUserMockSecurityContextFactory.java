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
                .userBirthYear("1999")
                .userBirthMonth("01")
                .userBirthDay("01")
                .userNickname("침착맨")
                .gender(Gender.MALE)
                .provider(Provider.KAKAO)
                .admin(Admin.ROLE_ADMIN)
                .build();
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(authUser, "password", List.of(new SimpleGrantedAuthority(role)));
        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(token);
        return context;
    }
}
