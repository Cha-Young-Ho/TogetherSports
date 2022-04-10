package com.togethersports.tosproejct.security.acl;

import com.togethersports.tosproejct.security.annotation.AclCreate;
import lombok.RequiredArgsConstructor;
import org.aopalliance.intercept.MethodInvocation;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.security.acls.domain.BasePermission;
import org.springframework.security.acls.domain.ObjectIdentityImpl;
import org.springframework.security.acls.domain.PrincipalSid;
import org.springframework.security.acls.jdbc.JdbcMutableAclService;
import org.springframework.security.acls.model.*;
import org.springframework.security.acls.model.Permission;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.Serializable;

/**
 * <h1>AclCreateAspect</h1>
 * <p>
 * 도메인 객체 생성 시 acl 정보의 자동 생성을 담당하는 aspect
 * </p>
 *
 * @author seunjeon
 */
@RequiredArgsConstructor
@Component
@Aspect
public class AclCreateAspect {

    private final JdbcMutableAclService aclService;

    /**
     * {@link com.togethersports.tosproejct.security.annotation.AclCreate} 어노테이션이 표시된 메소드 호출 시 ACL 정보를 함께 생성한다.
     *
     * @param pjp 조인 포인트에 관한 정보
     * @return object 도메인 객체 생성 메소드 반환값 그대로 반환
     * @throws Throwable
     */
    @Around("@annotation(com.togethersports.tosproejct.security.annotation.AclCreate)")
    public Object createAcl(ProceedingJoinPoint pjp) throws Throwable {
        MethodSignature methodSignature = (MethodSignature) pjp.getSignature();
        AclCreate annotation = methodSignature.getMethod().getAnnotation(AclCreate.class);

        Object returnValue = pjp.proceed();
        // acl 생성 전략에 따라 적절한 ObjectIdentity 객체 생성
        ObjectIdentity oi = null;
        if (annotation.strategy().equals(CreationStrategy.ENTITY_PARAMETER)) {
            int parameterIdx = annotation.parameterIdx();
            oi = new ObjectIdentityImpl(pjp.getArgs()[parameterIdx]);
        }
        if (annotation.strategy().equals(CreationStrategy.RETURN_ID_VALUE)) {
            oi = new ObjectIdentityImpl(annotation.type(), (Serializable) returnValue);
        }

        Sid sid = new PrincipalSid(SecurityContextHolder.getContext().getAuthentication());

        Permission permission = null;
        switch (annotation.permission()) {
            case READ:
                permission = BasePermission.READ;
                break;
            case CREATE:
                permission = BasePermission.CREATE;
                break;
            case WRITE:
                permission = BasePermission.WRITE;
                break;
            case DELETE:
                permission = BasePermission.DELETE;
                break;
            case ADMIN:
                permission = BasePermission.ADMINISTRATION;
                break;
        }
        MutableAcl acl = aclService.createAcl(oi);
        acl.insertAce(acl.getEntries().size(), permission, sid, true);
        aclService.updateAcl(acl);
        return returnValue;
    }
}
