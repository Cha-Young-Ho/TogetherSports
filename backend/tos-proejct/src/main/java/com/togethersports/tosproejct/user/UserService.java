package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.file.FileHandler;
import com.togethersports.tosproejct.jwt.JwtTokenProvider;
import com.togethersports.tosproejct.userProfileImage.UserProfileImage;
import com.togethersports.tosproejct.userProfileImage.UserProfileImageDTO;
import com.togethersports.tosproejct.userProfileImage.UserProfileImageRepository;
import com.togethersports.tosproejct.userProfileImage.UserProfileImageService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import javax.swing.filechooser.FileSystemView;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Arrays;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
//@Transactional
@Service
public class UserService {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final UserProfileImageService userProfileImageService;
    private final FileHandler fileHandler;

    public Optional<User> findByUserEmail(String userEmail) {
        return userRepository.findByUserEmail(userEmail);
    }

    public Optional<User> findByUserNickname(String userNickname) {
        return userRepository.findByUserNickname(userNickname);
    }

    /**
     *  회원가입 서비스
     */
    public String userSignup(UserDTO userDTO) {

        try {
            User user = User.builder()
                    .userSequenceId(userDTO.getUserSequenceId())
                    .userEmail(userDTO.getUserEmail())
                    .userName(userDTO.getUserName())
                    .userBirthYear(userDTO.getUserBirthYear())
                    .userBirthMonth(userDTO.getUserBirthMonth())
                    .userBirthDay(userDTO.getUserBirthDay())
                    .userNickname(userDTO.getUserNickname())
                    .roles(Arrays.asList(new SimpleGrantedAuthority(userDTO.getAdmin().toString()).toString()))
                    .gender(userDTO.getGender())
                    .provider(userDTO.getProvider())
                    .build();

            userRepository.save(user); // 회원 TB 데이터 등록

            if (userDTO.getUserProfileImage() != null) {

                fileHandler.userProfileImageUpload(userDTO); // 프로필 이미지 저장
                userProfileImageService.userProfileImageSave(user, userDTO); // 회원프로필이미지 TB 데이터 등록
            }
        } catch(Exception e) {
            e.printStackTrace();
            return "FAIL";
        }

        return "SUCCESS";
    }


    public Optional<User> getMyInfo(String accessToken){

        return getUserByEmailFromAccessToken(accessToken);
    }


    public Optional<User> updateUser(String accessToken, UserDTO userDTO){

        User user = getUserByEmailFromAccessToken(accessToken).get();

        user.update(userDTO);

        userRepository.save(user);

        if (userDTO.getUserProfileImage() != null) {
            fileHandler.userProfileImageUpload(userDTO); // 프로필 이미지 저장
            userProfileImageService.userProfileImageSave(user, userDTO); // 회원프로필이미지 TB 데이터 등록
        }

        return Optional.of(user);

    }

    // 엑세스 토큰으로부터 식별자값을 얻어 DB에 해당 유저 정보값을 받아와서 persistence context에 담음
    public Optional<User> getUserByEmailFromAccessToken(String accessToken){
        Claims claims = jwtTokenProvider.getClaims(accessToken);

        return userRepository.findByUserEmail(claims.get("sub").toString());

    }

    public Optional<OtherUserDTO> getOtherInformationByUserNickname(String userNickname){

        Optional<User> foundUser = userRepository.findByUserNickname(userNickname);

        return new OtherUserDTO().parsingUser(foundUser);

    }

}

