package com.togethersports.tosproject.security.jwt.repository;

import com.togethersports.tosproject.security.jwt.model.RefreshToken;
import com.togethersports.tosproject.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

/**
 * <h1>RefreshTokenRepository</h1>
 * <p>
 *     RefreshToken 의 CRUD 를 처리한다.
 * </p>
 * @author younghocha
 * @author seunjeon
 */
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    /**
     * 리프레쉬 토큰 값으로 리프레쉬 토큰 엔티티를 조회한다.<br>
     * 조회 시 사용자 정보를 함께 조회한다.
     * @param token 조회 대상 토큰 값
     * @return Optional 객체 (RefreshToken 객체 있는 경우), 빈 Optional 객체 (RefreshToken 가 없는 경우)
     */
    @Query("select r from RefreshToken r join fetch r.user where r.token = :token")
    Optional<RefreshToken> findByToken(@Param("token") String token);

    /**
     * 사용자 및 접속 기기 정보로 리프레쉬 토큰을 조회한다.<br>
     * 조회 시 사용자 정보를 함께 조회한다.
     * @param loggedInUser 리프레쉬 토큰의 주인인 사용자
     * @param clientIp 접속 IP 정보
     * @param userAgent 접속 기기 정보
     * @return Optional 객체 (RefreshToken 객체 있는 경우), 빈 Optional 객체 (RefreshToken 가 없는 경우)
     */
    @Query("select r from RefreshToken r join fetch r.user where r.user = :user and r.clientIp = :clientIp and r.userAgent = :userAgent")
    Optional<RefreshToken> findByDevice(@Param("user") User loggedInUser,
                                        @Param("clientIp") String clientIp,
                                        @Param("userAgent") String userAgent);
//
//    boolean existsByClientIpAndUserAgentAndProvider(String clientIp, String userAgent, String provider);
//    void deleteByClientIpAndUserAgentAndProvider(String clientIp, String userAgent, String provider);
//    void deleteByRefreshToken(String refreshToken);


}
