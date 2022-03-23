package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.exception.CustomDefaultException;
import com.togethersports.tosproejct.file.FileHandler;
import com.togethersports.tosproejct.security.jwt.JwtService;
import com.togethersports.tosproejct.security.jwt.JwtTokenProvider;
import com.togethersports.tosproejct.user.dto.UserDTO;
import com.togethersports.tosproejct.user.dto.UserOfMyInfo;
import com.togethersports.tosproejct.user.dto.UserOfOtherInfo;
import com.togethersports.tosproejct.userProfileImage.UserProfileImageService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
    private final ModelMapper modelMapper;
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
                    .userBirth(userDTO.getUserBirth())
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

    // 내 정보 조회
    public UserOfMyInfo getMyInfo(String accessToken){

        String userEmail = getUserEmailFromAccessToken(accessToken);

        User foundUser = userRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("가입되지 않은 유저입니다."));

        UserOfMyInfo userOfMyInfo = modelMapper.map(foundUser, UserOfMyInfo.class);


        return userOfMyInfo;
    }


    public void updateUser(String accessToken, UserDTO userDTO){

        String userEmail = getUserEmailFromAccessToken(accessToken);

        User userEntity = userRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("가입되지 않은 유저입니다."));
        userEntity.update(userDTO);

        userRepository.save(userEntity);


        // 이미지 처리 부분 전면 수정 필요
//        if (userDTO.getUserProfileImage() != null) {
//            fileHandler.userProfileImageUpload(userDTO); // 프로필 이미지 저장
//            userProfileImageService.userProfileImageSave(user, userDTO); // 회원프로필이미지 TB 데이터 등록
//        }



    }

    // 엑세스 토큰으로부터 식별자 값을 얻음
    public String getUserEmailFromAccessToken(String accessToken){
        Claims claims = jwtTokenProvider.getClaims(accessToken);


        return claims.get("sub").toString();

    }

    public UserOfOtherInfo getOtherInformationByUserNickname(String userNickname){

        User userEntity = userRepository.findByUserNickname(userNickname)
                .orElseThrow(() -> new UsernameNotFoundException("가입되지 않은 유저입니다."));

        UserOfOtherInfo userOfOtherInfo = modelMapper.map(userEntity, UserOfOtherInfo.class);

        return userOfOtherInfo;

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


    /**
     *
     * @param id
     * @return
     */
    public User findById(int id) {
        return userRepository.findById(id).orElseThrow(IllegalArgumentException::new);
    }
}

