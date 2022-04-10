package com.togethersports.tosproejct.security.acl;

/**
 * <h1>CreationStrategy</h1>
 * <p>
 *     ACL 정보 생성 방식에 관한 enum
 * </p>
 * <ul>
 *     <li>{@link #ENTITY_PARAMETER} - 매개변수로 받는 도메인 객체에 대해 ACL 정보 생성</li>
 *     <li>{@link #RETURN_ID_VALUE} - 반환값으로 받는 ID 를 식별자로 ACL 정보 생성 (타입 정보 필요)</li>
 * </ul>
 * @author seunjeon
 */
public enum CreationStrategy {
    ENTITY_PARAMETER,
    RETURN_ID_VALUE,
}
