package com.togethersports.tosproejct.userProfileImage;

import com.togethersports.tosproejct.user.User;
import com.togethersports.tosproejct.user.UserDTO;
import com.togethersports.tosproejct.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserProfileImageService {

    private final UserRepository userRepository;
    private final UserProfileImageRepository userProfileImageRepository;

    private String uploadFolder = "C:/files/profile/img/"; // ! 설정파일로 따로 관리해야함

    /**
     *  파일 업로드 기능 분할을 위한 서비스 로직 (미구현)
     */
    public void userProfileImgUpload(UserDTO userDTO){

        log.info("회원 프로필 이미지 업로드 호출");

        String realName = userDTO.getUserProfileImage().getUserProfileRealName();
        String extension = userDTO.getUserProfileImage().getUserProfileExtension();
        String image = userDTO.getUserProfileImage().getImage();
        int userSequenceId = userDTO.getUserSequenceId();

        log.info("getImage --> {}", image);

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

        } catch(IOException e) {
            e.printStackTrace();
        }
    }
}
