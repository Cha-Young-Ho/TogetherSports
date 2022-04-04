package com.togethersports.tosproejct.security.jwt;

import com.togethersports.tosproejct.user.User;
import com.togethersports.tosproejct.security.jwt.token.RefreshToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

// fixme 파라미터 -> DTO
/**
 * <h1>RefreshTokenService</h1>
 * <p>Refresh Entity 관리 Service</p>
 * <p>해당 클래스는 Refresh Entity와 관련한 비즈니스 로직 담당 클래스다.</p>
 * @author younghocha
 */
@RequiredArgsConstructor
@Transactional
@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    public void saveRefreshToken(User loggedInUser, String refreshToken, String clientIp, String userAgent) {

        if(refreshTokenRepository.existsByClientIpAndUserAgentAndProvider
                (clientIp, userAgent, loggedInUser.getProvider().getProviderName())){

                refreshTokenRepository.deleteByClientIpAndUserAgentAndProvider
                        (clientIp, userAgent, loggedInUser.getProvider().getProviderName());
        }

        refreshTokenRepository.save(createRefreshToken(loggedInUser, refreshToken, clientIp, userAgent));
    }

    public void renewalRefreshToken(RefreshToken refreshToken){

        refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken createRefreshToken(User loggedInUser, String refreshToken, String clientIp, String userAgent){

        return RefreshToken.createRefreshToken
                (loggedInUser.getEmail(),
                        loggedInUser.getId(),
                        refreshToken,
                        loggedInUser.getRole(),
                        clientIp,
                        userAgent,
                        loggedInUser.getProvider().getProviderName());
    }

    public RefreshToken getRefreshToken(String refreshToken){
        return refreshTokenRepository.findByRefreshToken(refreshToken);
    }

    public void removeRefreshToken(Long id, String clientIp, String userAgent, String provider){
        // 기존에 존재하던 refresh Token 제거
        refreshTokenRepository.deleteById(id);

        // 같은 ip의 중복된 Refresh Token 제거
        if(refreshTokenRepository.existsByClientIpAndUserAgentAndProvider(clientIp, userAgent, provider)){
            refreshTokenRepository.deleteByClientIpAndUserAgentAndProvider(clientIp, userAgent, provider);
        }
    }

    public void removeRefreshTokenByToken(String refreshToken){

        // 기존에 존재하던 refresh Token 제거
        refreshTokenRepository.deleteByRefreshToken(refreshToken);

    }


}
