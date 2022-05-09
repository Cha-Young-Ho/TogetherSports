package com.togethersports.tosproject.security.acl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.acls.AclPermissionEvaluator;
import org.springframework.security.acls.domain.*;
import org.springframework.security.acls.jdbc.BasicLookupStrategy;
import org.springframework.security.acls.jdbc.JdbcMutableAclService;
import org.springframework.security.acls.jdbc.LookupStrategy;
import org.springframework.security.acls.model.PermissionGrantingStrategy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.sql.DataSource;

/**
 * <h1>AclConfig</h1>
 * <p>
 *     ACL (Access Control List) 관련 빈 설정 클래스
 * </p>
 *
 * @author seunjeon
 */
@Configuration
public class AclConfig {

    // acl 데이터 조회를 이용하기 위한 빈
    @Autowired
    private DataSource dataSource;

    // acl 권한 처리에 캐싱을 사용하기 위한 빈
    @Autowired
    private CacheManager cacheManager;

    // 사용자 권한 별 acl 객체에 대한 접근 권한 설정
    // 첫번째 - acl 소유권 변경 권한
    // 두번째 - 감사 세부정보 수정 권한
    // 세번째 - ace 등의 변경 권한
    @Bean
    public AclAuthorizationStrategy aclAuthorizationStrategy() {
        return new AclAuthorizationStrategyImpl(
                new SimpleGrantedAuthority("ROLE_USER"),
                new SimpleGrantedAuthority("ROLE_ADMIN"),
                new SimpleGrantedAuthority("ROLE_USER")
        );
    }

    // acl 권한 확인 전략 설정 빈
    // ConsoleAuditLogger 는 로깅을 위해 사용됨
    @Bean
    public PermissionGrantingStrategy permissionGrantingStrategy() {
        return new DefaultPermissionGrantingStrategy(new ConsoleAuditLogger());
    }

    @Bean
    public SpringCacheBasedAclCache aclCache() {
        return new SpringCacheBasedAclCache(cacheManager.getCache("aclCache"), permissionGrantingStrategy(), aclAuthorizationStrategy());
    }

    @Bean
    public LookupStrategy lookupStrategy() {
        return new BasicLookupStrategy(
                dataSource,
                aclCache(),
                aclAuthorizationStrategy(),
                new ConsoleAuditLogger()
        );
    }

    @Bean
    public JdbcMutableAclService aclService() {
        return new JdbcMutableAclService(dataSource, lookupStrategy(), aclCache());
    }

    @Bean
    public MethodSecurityExpressionHandler methodSecurityExpressionHandler() {
        DefaultMethodSecurityExpressionHandler expressionHandler = new DefaultMethodSecurityExpressionHandler();
        AclPermissionEvaluator evaluator = new AclPermissionEvaluator(aclService());
        expressionHandler.setPermissionEvaluator(evaluator);
        return expressionHandler;
    }
}
