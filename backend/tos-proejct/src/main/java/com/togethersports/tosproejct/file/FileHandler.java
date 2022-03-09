package com.togethersports.tosproejct.file;

import com.togethersports.tosproejct.exception.Base64DecodeException;
import com.togethersports.tosproejct.user.UserDTO;
import com.togethersports.tosproejct.userProfileImage.UserProfileImage;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Component
public class FileHandler {

    private String uploadFolder = "C:/files/profile/img/"; // ! 설정파일로 따로 관리해야함

    public void userProfileImageUpload(UserDTO userDTO) {

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

            //파일저장명 DTO에 set (DB에 저장하기 위한)
            userDTO.getUserProfileImage().setUserProfileSaveName(fileSaveName);

            //최종 저장 디렉토리 + 저장 파일명
            Path filePath = Paths.get(uploadFolder + fileSaveName);

            byte[] decodeBytes = Base64.getDecoder().decode(userDTO.getUserProfileImage().getImageSource());

            //파일 생성
            Files.write(filePath, decodeBytes);


        } catch (IOException e) {
            log.info("IO 발생");
            e.printStackTrace();
        } catch (IllegalArgumentException e) {
            throw new Base64DecodeException();
        }
    }
}
