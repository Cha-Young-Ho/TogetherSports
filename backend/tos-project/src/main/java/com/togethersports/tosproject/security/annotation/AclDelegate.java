package com.togethersports.tosproject.security.annotation;

import com.togethersports.tosproject.security.acl.AclPermission;

import java.lang.annotation.*;

/**
 * <h1>@AclDelegate</h1>
 * <p>
 *     기존에 생성된 ACL 정보의 소유권 및 권한을 이전해준다. 소유권을 이전 받는 다른 사용자는 기존 소유권자의 권한을 그대로 받으며
 *     기존 소유권자는 어노테이션에 명시된 권한으로 권한이 변경된다.
 * </p>
 * <p>
 *     소유권 이전 대상과 소유권은 위임 받을 새로운 사용자 정보를 반드시 메소드의 매개변수로 받아야 한다.
 * </p>
 * <pre>
 *      &#64;AclDelegate(targetType = Room.class, ownerType = User.class)
 *      public Long delegateRoom(Room room, User newOwner) {
 *          ...
 *      }
 * </pre>
 * @author seunjeon
 * @see com.togethersports.tosproject.security.acl.AclAspect
 */
@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AclDelegate {

    /**
     * 소유권을 변경할 도메인 객체 타입
     */
    Class<?> targetType();

    /**
     * 소유권을 물려받을 대상 사용자 객체 타입
     */
    Class<?> ownerType();

    /**
     * 소유권 이전 이후 기존 소유자가 해당 도메인 객체에 대해 가지게 될 권한 정보
     */
    AclPermission permission();
}
