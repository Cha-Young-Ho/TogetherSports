package com.togethersports.tosproejct.file;

import com.togethersports.tosproejct.exception.Base64DecodeException;
import com.togethersports.tosproejct.user.UserDTO;
import com.togethersports.tosproejct.userProfileImage.UserProfileImage;
import com.togethersports.tosproejct.userProfileImage.UserProfileImageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Base64Util;
import org.springframework.stereotype.Component;
import org.springframework.util.Base64Utils;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Component
public class FileHandler {

    private final UserProfileImageRepository userProfileImageRepository;

    private String uploadFolder = System.getProperty("user.home") + "/files/profile/img/"; // ! 설정파일로 따로 관리해야함


    public void userProfileImageUpload(UserDTO userDTO) {

        try {
            log.info("uploadFolder --> {}", uploadFolder);

            if(
                userDTO.getUserProfileImage().getUserProfileRealName() == null
                || userDTO.getUserProfileImage().getUserProfileExtension() == null
                || userDTO.getUserProfileImage().getImageSource() == null
            ) {
                log.info(" 첨부된 이미지가 없습니다. ");
                return;
            }

            String extension = userDTO.getUserProfileImage().getUserProfileExtension();

            Path uploadPath = Paths.get(uploadFolder);

            //디렉토리 생성
            Files.createDirectories(uploadPath);

            //나노초 날짜 생성
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter dateTimeFormatter =
                    DateTimeFormatter.ofPattern("yyyyMMdd");
            String current_date = now.format(dateTimeFormatter);


            //저장 파일명 생성
            String fileSaveName = "TogetherSports_"+current_date + "_"+System.nanoTime() + "." + extension;

            //최종 저장 디렉토리 + 저장 파일명
            Path filePath = Paths.get(uploadFolder + fileSaveName);


            //파일저장명 DTO에 set (DB에 저장하기 위한)
            userDTO.getUserProfileImage().updateSaveName(fileSaveName);

            //파일 path DTO에 set
            userDTO.getUserProfileImage().updateUserProfileFilePath(uploadFolder + fileSaveName);


            byte[] decodeBytes = Base64.getDecoder().decode(Base64Utils.encodeToUrlSafeString(userDTO.getUserProfileImage().getImageSource().getBytes()));

            //파일 생성
            Files.write(filePath, decodeBytes);


        } catch (IOException e) {
            log.info("IO 발생");
            e.printStackTrace();
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        }
    }
}
