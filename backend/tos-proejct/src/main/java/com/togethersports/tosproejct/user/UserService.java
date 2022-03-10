package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.jwt.JwtTokenProvider;
import com.togethersports.tosproejct.userProfileImage.UserProfileImage;
import com.togethersports.tosproejct.userProfileImage.UserProfileImageRepository;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.swing.filechooser.FileSystemView;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final JwtTokenProvider jwtTokenProvider;

    private final UserRepository userRepository;

    private final UserProfileImageRepository userProfileImageRepository;

    public Optional<User> getUserFindByEmail(String userEmail) {
        return userRepository.findByUserEmail(userEmail);
    }

    private String uploadFolder = "C:/files/profile/img/"; // ! 설정파일로 따로 관리해야함

    /**
     *  회원가입 서비스
     */
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
                .roles(Arrays.asList(new SimpleGrantedAuthority(userDTO.getAdmin().toString()).toString()))
                .gender(userDTO.getGender())
                .provider(userDTO.getProvider())
                .build();

        userRepository.save(user);

        String realName = userDTO.getUserProfileImage().getUserProfileRealName();
        String extension = userDTO.getUserProfileImage().getUserProfileExtension();

        Path uploadPath = Paths.get(uploadFolder);

        try {
            //디렉토리 생성
            Files.createDirectories(uploadPath);

            //저장 파일명 생성
            String fileSaveName = UUID.randomUUID()
                    + "_"
                    + realName
                    + "."
                    + extension;

            //최종 저장 디렉토리 + 저장 파일명
            Path filePath = Paths.get(uploadFolder + fileSaveName);

            byte[] decodeBytes = Base64.getDecoder().decode(userDTO.getUserProfileImage().getImage());

            //파일 생성
            Files.write(filePath, decodeBytes);

            //회원 프로필 이미지 DB 저장
            UserProfileImage userProfileImage = UserProfileImage
                    .builder()
                    .user(user)
                    .userProfileRealName(realName)
                    .userProfileSaveName(fileSaveName)
                    .userProfileExtension(extension)
                    .build();

            userProfileImageRepository.save(userProfileImage);

        } catch(IOException e) {
            e.printStackTrace();
        }
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

    public Optional<OtherUserDTO> getOtherInformationByUserNickname(String userNickname){

        User foundUser = userRepository.findByUserNickname(userNickname)
                .orElseThrow(() -> new UsernameNotFoundException("가입되지 않은 Nickname 입니다."));

        return new OtherUserDTO().parsingUser(foundUser);

    }

}

