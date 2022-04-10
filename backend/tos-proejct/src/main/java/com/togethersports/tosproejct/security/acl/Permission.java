package com.togethersports.tosproejct.security.acl;

/**
 * <h1>Permission</h1>
 * <p>
 * 특정 사용자가 도메인 객체에 대해 가지는 권한 정보를 나타낸다.
 * </p>
 * <ul>
 *     <li>{@link #READ} 도메인 객체 조회 권한</li>
 *     <li>{@link #WRITE} 도메인 객체 쓰기 권한</li>
 *     <li>{@link #CREATE} 도메인 객체 생성 권한</li>
 *     <li>{@link #DELETE} 도메인 객체 삭제 권한</li>
 *     <li>{@link #ADMIN} 도메인 객체 전체 권한</li>
 * </ul>
 * @author seunjeon
 */
public enum Permission {
    READ,
    WRITE,
    CREATE,
    DELETE,
    ADMIN
}
