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
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserProfileImageService {

    private final UserRepository userRepository;
    private final UserProfileImageRepository userProfileImageRepository;

    //회원 프로필 이미지 DB 저장 (연관관계로 부모 user 객체가 필요하여 파라미터를 DTO와 따로 받음)
    public void userProfileImageSave(User user, UserDTO userDTO) {

        UserProfileImageDTO userProfileImageDTO = userDTO.getUserProfileImage();

        UserProfileImage userProfileImage = UserProfileImage
                .builder()
                .user(user)
                .userProfileRealName(userProfileImageDTO.getUserProfileRealName())
                .userProfileSaveName(userProfileImageDTO.getUserProfileSaveName())
                .userProfileExtension(userProfileImageDTO.getUserProfileExtension())
                .userProfileImageFilePath(userProfileImageDTO.getUserProfileFilePath())
                .build();

        userProfileImageRepository.save(userProfileImage);
    }

    public void userProfileImageDefaultSave(User user, UserDTO userDTO){
        UserProfileImage userProfileImage = UserProfileImage
                .builder()
                .user(user)
                .build();

        userProfileImageRepository.save(userProfileImage);
    }

}
