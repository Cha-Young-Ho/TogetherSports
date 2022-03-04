package com.togethersports.tosproejct.myInfomationTest;

import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.util.List;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = CustomUserMockSecurityContextFactory.class)
public @interface CustomUserMock {
    String email();
    String role();
}

