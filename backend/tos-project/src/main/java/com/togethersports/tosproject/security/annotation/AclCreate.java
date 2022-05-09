package com.togethersports.tosproject.security.annotation;


import com.togethersports.tosproject.security.acl.AclPermission;


import java.lang.annotation.*;

/**
 * <h1>@AclCreate</h1>
 * <p>
 *     도메인 객체 생성 시 acl 정보를 함께 생성할 수 있게 해준다. 생성 시 관리자 또는 매니저 권한을 부여할 수 있다.
 * </p>
 * <p>
 *     이 어노테이션이 적용되는 메소드는 반드시 아래의 조건중 하나를 만족해야 한다.
 * </p>
 * <ol>
 *     <li>도메인 객체 생성 메소드의 매개변수로 해당 도메인 객체를 받아야 한다.</li>
 *     <li>도메인 객체 생성 이후 해당 도메인 객체의 식별자(DB pk)를 반환해야 한다.</li>
 * </ol>
 * <p>
 *     사용 예 (새로운 User 객체를 생성할 때, 매개변수로 해당 도메인 객체를 받는 경우)
 * </p>
 * <pre>
 *     &#64;AclCreate(type = User.class, permission = AclPermission.ADMIN)
 *     public void createUser(<b>User user</b>) {
 *         ...
 *     }
 * </pre>
 * <p>
 *     사용 예 (새로운 User 객체를 생성할 때, 매개변수로 DTO 를 받고 생성된 도메인 객체의 식별자를 반환하는 경우)
 * </p>
 * <pre>
 *      &#64;AclCreate(type = User.class, permission = AclPermission.ADMIN)
 *      public Long createUser(UserOfCreate create) {
 *          ...
 *          <b>return user.getId();</b>
 *      }
 * </pre>
 * <p>어노테이션 사용 방법은 동일하지만 정해진 메소드 규격을 벗어나지 않도록 주의해야한다.</p>
 * <p>사용자 인증이 완료되어 시큐리티 컨텍스트에 인증 객체(익명은 안됨)가 존재할 때에만 사용해야 한다.</p>
 * @author seunjeon
 * @see AclPermission
 * @see com.togethersports.tosproject.security.acl.AclAspect
 */
@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AclCreate {

    /**
     * 생성될 도메인 객체의 타입 정보
     */
    Class<?> type();

    /**
     * 생성될 acl 의 권한 정보
     */
    AclPermission permission();
}
