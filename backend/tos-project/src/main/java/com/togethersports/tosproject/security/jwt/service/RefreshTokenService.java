package com.togethersports.tosproject.security.jwt.service;

import com.togethersports.tosproject.security.jwt.exception.RefreshTokenNotFoundException;
import com.togethersports.tosproject.security.jwt.model.RefreshToken;
import com.togethersports.tosproject.security.jwt.repository.RefreshTokenRepository;
import com.togethersports.tosproject.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * <h1>RefreshTokenService</h1>
 * <p>Refresh Entity 관리 Service</p>
 * <p>해당 클래스는 RefreshToken Entity 와 관련된 비즈니스 로직 담당 클래스다.</p>
 * @author younghocha
 */
@RequiredArgsConstructor
@Transactional
@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    /**
     * 리프레쉬 토큰을 DB 에 저장한다. <br>
     * 만약 같은 사용자가 같은 기기에 이미 리프레쉬 토큰을 생성한 이력이 있는 경우에는 해당 토큰의 값을 갱신한다.
     * @param loggedInUser 사용자
     * @param token 저장할 토큰 값
     * @param clientIp 사용자 접속 IP
     * @param userAgent 사용자 접속 기기 정보
     * @return id 생성된 토큰 식별자
     */
    public Long saveRefreshToken(User loggedInUser, String token, String clientIp, String userAgent) {
        Optional<RefreshToken> byDevice = refreshTokenRepository.findByDevice(loggedInUser, clientIp, userAgent);

        if (byDevice.isPresent()) {
            RefreshToken findRefreshToken = byDevice.get();
            findRefreshToken.changeToken(token);
            return findRefreshToken.getId();
        }

        RefreshToken newRefreshToken = RefreshToken.createRefreshToken(loggedInUser, token, clientIp, userAgent);
        refreshTokenRepository.save(newRefreshToken);
        return newRefreshToken.getId();
    }

    /**
     * 리프레쉬 토큰 값으로 RefreshToken 엔티티 조화하여 반환
     * @param token 조회 대상 토큰 값
     * @return refreshToken 조회된 토큰 값 (User 포함)
     */
    public RefreshToken findByToken(String token) {
        return refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new RefreshTokenNotFoundException("리프레쉬 토큰이 존재하지 않습니다."));
    }

    /**
     * 리프레쉬 토큰을 갱신한다.
     * @param refreshToken 갱신할 대상 리프레쉬 토큰 엔티티
     * @param token 갱신할 토큰 값
     * @return token 갱신된 토큰 값
     */
    public String renewRefreshToken(RefreshToken refreshToken, String token) {
        refreshToken.changeToken(token);
        return token;
    }

    public void removeRefreshTokenByToken(String refreshToken){
        // 기존에 존재하던 refresh Token 제거
        refreshTokenRepository.deleteByToken(refreshToken);
    }
}
