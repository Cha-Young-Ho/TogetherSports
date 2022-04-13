package com.togethersports.tosproejct.security.acl;

import com.togethersports.tosproejct.security.annotation.AclCreate;
import com.togethersports.tosproejct.security.annotation.AclDelegate;
import com.togethersports.tosproejct.security.jwt.model.UserContext;
import com.togethersports.tosproejct.user.User;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.security.acls.domain.ObjectIdentityImpl;
import org.springframework.security.acls.domain.PrincipalSid;
import org.springframework.security.acls.jdbc.JdbcMutableAclService;
import org.springframework.security.acls.model.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.lang.annotation.Annotation;
import java.util.List;
import java.util.stream.Collectors;

/**
 * <h1>AclAspect</h1>
 * <p>
 *     ACL 권한 정보 생성, 위임 등의 작업을 처리하는 aspect
 * </p>
 * <ul>
 *     <li>{@link #createAcl(ProceedingJoinPoint)} acl 권한 생성 처리</li>
 *     <li>{@link #delegateOwnership(ProceedingJoinPoint)} acl 소유권 및 권한 이전 처리</li>
 * </ul>
 * @author seunjeon
 */
@RequiredArgsConstructor
@Component
@Aspect
public class AclAspect {

    private final JdbcMutableAclService aclService;

    /**
     * 도메인 객체 생성시 acl 권한 정보 생성을 처리한다.
     * @param pjp 메소드 실행 정보
     * @return methodReturnValue 메소드 기존 반환값 그대로 반환
     * @throws Throwable
     * @see AclCreate
     */
    @Around("@annotation(com.togethersports.tosproejct.security.annotation.AclCreate)")
    public Object createAcl(ProceedingJoinPoint pjp) throws Throwable {
        AclCreate annotation = (AclCreate) getAnnotation(pjp, AclCreate.class);
        Object returnValue = pjp.proceed();

        // acl object identity 생성
        ObjectIdentity oi = null;
        for (Object arg : pjp.getArgs()) {
            if (arg.getClass().equals(annotation.type())) {
                oi = new ObjectIdentityImpl(arg);
                break;
            }
        }

        if (oi == null) {
            oi = new ObjectIdentityImpl(annotation.type(), (Serializable) returnValue);
        }

        MutableAcl createdAcl = aclService.createAcl(oi);

        // acl permission 정보 추가
        int currentAceIdx = createdAcl.getEntries().size();
        List<Permission> permissions = annotation.permission().getPermission();
        String name = SecurityContextHolder.getContext().getAuthentication().getName();

        Sid sid = new PrincipalSid(name);
        for (Permission permission : permissions) {
            createdAcl.insertAce(currentAceIdx++, permission, sid, true);
        }

        // 변경사항 적용
        aclService.updateAcl(createdAcl);
        return returnValue;
    }

    /**
     * acl 소유권 및 권한 위임 작업을 처리한다.
     * @param pjp 메소드 실행 정보
     * @return methodReturnValue 메소드 기존 반환값 그대로 반환
     * @throws Throwable
     * @see AclDelegate
     */
    @Around("@annotation(com.togethersports.tosproejct.security.annotation.AclDelegate)")
    public Object delegateOwnership(ProceedingJoinPoint pjp) throws Throwable {
        Object returnValue = pjp.proceed();
        AclDelegate annotation = (AclDelegate) getAnnotation(pjp, AclDelegate.class);

        Object newOwner = null;
        Object targetDomain = null;
        for (Object arg : pjp.getArgs()) {
            if (arg.getClass().equals(annotation.targetType())) {
                targetDomain = arg;
            }

            if (arg.getClass().equals(annotation.ownerType())) {
                newOwner = arg;
            }
        }

        ObjectIdentity oi = new ObjectIdentityImpl(targetDomain);
        MutableAcl acl = (MutableAcl) aclService.readAclById(oi);
        PrincipalSid newOwnerSid = new PrincipalSid(new UserContext((User) newOwner).getUsername());
        acl.setOwner(newOwnerSid);

        // 기존 소유자 권한 삭제 및 신규 소유자 권한 추가
        List<Permission> permissions = acl.getEntries().stream()
                .map(AccessControlEntry::getPermission)
                .collect(Collectors.toList());

        for (int i = 0; i < permissions.size(); i++) {
            acl.deleteAce(0);
        }

        for (int i = 0; i < permissions.size(); i++) {
            acl.insertAce(0, permissions.get(i), newOwnerSid, true);
        }

        // 기존 소유자 변경된 권한 적용
        Sid oldOwner = new PrincipalSid(SecurityContextHolder.getContext().getAuthentication());
        for (Permission permission : annotation.permission().getPermission()) {
            acl.insertAce(acl.getEntries().size(), permission, oldOwner, true);
        }
        aclService.updateAcl(acl);
        return returnValue;
    }

    private Annotation getAnnotation(ProceedingJoinPoint pjp, Class<? extends Annotation> annotationType) {
        return ((MethodSignature) pjp.getSignature()).getMethod().getAnnotation(annotationType);
    }
}
