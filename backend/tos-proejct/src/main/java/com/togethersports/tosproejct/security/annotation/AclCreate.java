package com.togethersports.tosproejct.security.annotation;

import com.togethersports.tosproejct.security.acl.CreationStrategy;
import com.togethersports.tosproejct.security.acl.Permission;

import java.lang.annotation.*;

/**
 * <h1>AclCreate</h1>
 * <p>
 *     해당 어노테이션이 적용된 메소드 호출 시 도메인 객체에 대한 acl 정보를 함께 생성한다.
 * </p>
 * <ul>
 *     <li>{@link #type()} 생성되는 도메인 객체 타입을 명시한다. (매개변수로 도메인 객체를 받는 경우 불필요)</li>
 *     <li>{@link #strategy()} acl 생성 전략을 표시한다. (매개변수 기반 또는 반환 식별자 기반 {@link CreationStrategy})</li>
 *     <li>{@link #parameterIdx()} 매개변수 기반 생성 시 매개변수 위치를 명시한다. (첫번째 매개변수가 도메인 객체일 경우 불필요)</li>
 *     <li>{@link #permission()} 생성될 acl 의 권한 정보를 명시한다. {@link Permission}</li>
 * </ul>
 *
 * @author seunjeon
 */
@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AclCreate {

    Class<?> type() default Object.class;

    CreationStrategy strategy();

    int parameterIdx() default 0;

    Permission permission() default Permission.ADMIN;

}
