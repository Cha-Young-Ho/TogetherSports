package com.togethersports.tosproejct.account;

import com.togethersports.tosproejct.security.oauth2.model.OAuth2Provider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * <h1>UserRepository</h1>
 * <p>사용자 계정 엔티티 CRUD 리포지토리</p>
 *
 * @author yunghocha
 * @author seunjeon
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * 이메일로 사용자 계정 단건 조회
     * @param email 조회할 대상 계정의 이메일
     * @return Optional 객체 (account 객체 있는 경우), 빈 Optional 객체 (account 가 없는 경우)
     */
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndProvider(String email, OAuth2Provider provider);
    boolean existsByNickname(String nickname);
}
