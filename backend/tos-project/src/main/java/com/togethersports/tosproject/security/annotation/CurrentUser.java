package com.togethersports.tosproject.security.annotation;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.lang.annotation.*;

/**
 * <h1>@CurrentUser</h1>
 * <p>
 *     Security Context 내의 인증 토큰 에서 User 객체를 바로 가져오도록 하는 어노테이션.
 *     Security Context 내에 익명 인증 토큰이 있는 경우, 즉 로그인이 되지 않은 경우 null 이 주입되므로 주의해야한다.
 *     이 어노테이션으로 가져온 User 객체는 jpa 에 영속화되지 않은 상태이며 DB 상에서 조회한 것이 아니다.
 *     따라서 해당 객체를 영속화 할 경우 문제가 발생할 수 있다.
 * </p>
 * <p>사용 예</p>
 * <pre>
 * <b>&#64;GetMapping("/")</b>
 * public String sample(<b>@CurrentUser</b> User user) {
 *     ...
 * }
 *
 * </pre>
 * @author seunjeon
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
@Documented
@AuthenticationPrincipal(expression = "#this == 'anonymous' ? null : user")
public @interface CurrentUser {
}
