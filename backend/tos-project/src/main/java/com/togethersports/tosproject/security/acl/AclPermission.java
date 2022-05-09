package com.togethersports.tosproject.security.acl;

import org.springframework.security.acls.domain.BasePermission;
import org.springframework.security.acls.model.Permission;

import java.util.List;

/**
 * @author seunjeon
 */
public enum AclPermission {
    // 도메인 객체 관리자 권한 모든 오퍼레이션 허용
    ADMIN(List.of(BasePermission.READ,
            BasePermission.CREATE,
            BasePermission.WRITE,
            BasePermission.DELETE,
            BasePermission.ADMINISTRATION)),

    // 도메인 객체 매니저 권한 삭제 및 관리자 권한 제외 모든 오퍼레이션 허용
    MANAGER(List.of(BasePermission.READ,
            BasePermission.CREATE,
            BasePermission.WRITE));
    private final List<Permission> permission;

    AclPermission(List<Permission> permission) {
        this.permission = permission;
    }

    public List<Permission> getPermission() {
        return permission;
    }
}
