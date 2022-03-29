package com.togethersports.tosproejct.security.jwt;

import com.togethersports.tosproejct.account.Account;
import com.togethersports.tosproejct.security.jwt.token.RefreshToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
// fixme 파라미터 -> DTO
@RequiredArgsConstructor
@Transactional
@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    public void saveRefreshToken(Account loggedInUser, String refreshToken, String clientIp, String userAgent) {

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

    public RefreshToken createRefreshToken(Account loggedInUser, String refreshToken, String clientIp, String userAgent){

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
}
