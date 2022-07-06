package com.togethersports.tosproject.user;

import com.togethersports.tosproject.security.oauth2.model.OAuth2Provider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * 이메일로 사용자 계정 단건 조회
     * @param email 조회할 대상 계정의 이메일
     * @return Optional 객체 (account 객체 있는 경우), 빈 Optional 객체 (account 가 없는 경우)
     */
    Optional<User> findByEmail(String email);

    /**
     * 이메일과 OAuth2 제공자로 계정 단건 조회
     * @param email 조회할 대상 계정의 이메일
     * @param provider 조회할 대상 계정의 OAuth2 제공자 정보
     * @return Optional 객체 (account 객체 있는 경우), 빈 Optional 객체 (account 가 없는 경우)
     */

    Optional<User> findByEmailAndProvider(String email, OAuth2Provider provider);

    boolean existsByNickname(String nickname);

}
