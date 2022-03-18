package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.code.Code;
import com.togethersports.tosproejct.exception.CustomDefaultException;
import com.togethersports.tosproejct.file.FileHandler;
import com.togethersports.tosproejct.jwt.JwtService;
import com.togethersports.tosproejct.jwt.JwtTokenProvider;
import com.togethersports.tosproejct.userProfileImage.UserProfileImage;
import com.togethersports.tosproejct.userProfileImage.UserProfileImageDTO;
import com.togethersports.tosproejct.userProfileImage.UserProfileImageRepository;
import com.togethersports.tosproejct.userProfileImage.UserProfileImageService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.swing.filechooser.FileSystemView;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
//@Transactional
@Service
public class UserService {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final UserProfileImageService userProfileImageService;
    private final FileHandler fileHandler;
    private final JwtService jwtService;
    public Optional<User> findByUserEmail(String userEmail) {
        return userRepository.findByUserEmail(userEmail);
    }

    public Optional<User> findByUserNickname(String userNickname) {
        return userRepository.findByUserNickname(userNickname);
    }

    /**
     *  회원가입 서비스
     */
    public void userSignup(UserDTO userDTO) {

        try {
            User user = User.builder()
                    .userEmail(userDTO.getUserEmail())
                    .userName(userDTO.getUserName())
                    .userBirthYear(userDTO.getUserBirthYear())
                    .userBirthMonth(userDTO.getUserBirthMonth())
                    .userBirthDay(userDTO.getUserBirthDay())
                    .userNickname(userDTO.getUserNickname())
                    .roles(Arrays.asList(new SimpleGrantedAuthority("ADMIN").toString()))
                    .gender(userDTO.getGender())
                    .provider(userDTO.getProvider())
                    .build();

            userRepository.save(user); // 회원 TB 데이터 등록

            if (!(userDTO.getUserProfileImage().getImageSource().equals("정보 없음"))) {
                fileHandler.userProfileImageUpload(userDTO); // 프로필 이미지 저장
                userProfileImageService.userProfileImageSave(user, userDTO); // 회원프로필이미지 TB 데이터 등록

                return;
            }

                userProfileImageService.userProfileImageDefaultSave(user, userDTO);

        } catch(Exception e) {
            e.printStackTrace();
            throw new CustomDefaultException();
        }


    }


    public Optional<User> getMyInfo(String accessToken){

        Optional<User> getUser = getUserByEmailFromAccessToken(accessToken);
        //List<UserProfileImage> userProfileImageList = getUser.get().getUserProfileImageList();
        //log.info("user profile = {}", userProfileImageList.get(0));



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

        User foundUser = userRepository.findByUserNickname(userNickname)
                .orElseThrow(() -> new UsernameNotFoundException("가입되지 않은 Nickname 입니다."));

        return new OtherUserDTO().parsingUser(foundUser);

    }

    public boolean sinUpCheck(String userEmail){

        log.info("유저 존재 체크 = {}", userRepository.existsByUserEmail(userEmail));

        //해당 유저 이메일이 존재하면 false 반환
        if(userRepository.existsByUserEmail(userEmail)){
            return false;
        }

        //존재하지 않으면 true 반환
        return true;
    }

    public boolean duplicationCheck(String userNickname){

        //닉네임이 이미 존재하면 false 반환
        if(userRepository.existsByUserNickname(userNickname)){
            return false;
        }

        //해당 닉네임으로 가입이 가능하면 true 반환
        return true;
    }


}

