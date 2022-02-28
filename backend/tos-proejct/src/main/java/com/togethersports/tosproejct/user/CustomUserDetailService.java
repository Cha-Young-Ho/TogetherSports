package com.togethersports.tosproejct.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;
    //private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return userRepository.findByUserEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));


    }

//    public Token login(User member){
//
//        Token tokens = jwtTokenProvider.createAccessToken(member.getUsername(), member.getRoles());
//        refreshTokenRepository.save(RefreshToken.builder().token(tokens.getRefreshToken()).keyEmail(tokens.getKey()).build());
//        return tokens;
//    }
//
//    public void saveToken(RefreshToken refreshToken){
//
//        refreshTokenRepository.save(refreshToken);
//
//    }
}
