package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.jwt.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final JwtTokenProvider jwtTokenProvider;

    private final UserRepository userRepository;

    public Optional<User> getUserFindByEmail(String userEmail) {
        return userRepository.findByUserEmail(userEmail);
    }

    public void userSignup(UserDTO userDTO) {


        log.info("userDTD auth -> {}", userDTO.getAdmin());

        User user = User.builder()
                .userSequenceId(userDTO.getUserSequenceId())
                .userEmail(userDTO.getUserEmail())
                .userName(userDTO.getUserName())
                .userBirthYear(userDTO.getUserBirthYear())
                .userBirthMonth(userDTO.getUserBirthMonth())
                .userBirthDay(userDTO.getUserBirthDay())
                .userNickname(userDTO.getUserNickname())
                .userState(userDTO.getUserState())
                .roles(Arrays.asList(new SimpleGrantedAuthority(userDTO.getAdmin().toString()).toString()))
                .gender(userDTO.getGender())
                .mannerPoint(userDTO.getMannerPoint())
                .locationX(userDTO.getLocationX())
                .locationY(userDTO.getLocationY())
                .provider(userDTO.getProvider())
                .build();

        userRepository.save(user);
    }

    public Optional<User> getMyInfo(String accessToken){

        return getUserByEmailFromAccessToken(accessToken);
    }


    public Optional<User> updateUser(String accessToken, UserDTO userDTO){


        User user = getUserByEmailFromAccessToken(accessToken).get();

        user.update(userDTO);

        userRepository.save(user);

        return Optional.of(user);

    }

    // 엑세스 토큰으로부터 식별자값을 얻어 DB에 해당 유저 정보값을 받아와서 persistence context에 담음
    public Optional<User> getUserByEmailFromAccessToken(String accessToken){
        Claims claims = jwtTokenProvider.getClaims(accessToken);

        return userRepository.findByUserEmail(claims.get("sub").toString());

    }
}

