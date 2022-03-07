package com.togethersports.tosproejct.file;

import com.togethersports.tosproejct.user.ProfileDTO;
import com.togethersports.tosproejct.user.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;


@Slf4j
@RequiredArgsConstructor
@Service
public class FileService {

    private final FileRepository fileRepository;

    private String uploadFolder = "C:/files/profile/img/"; // ! 설정파일로 따로 관리해야함

    /**
     *  파일 업로드 기능
     */
    public void userImgUpload(UserDTO userDTO){

        Path uploadPath = Paths.get(uploadFolder);

        try {
            //디렉토리 생성
            Files.createDirectories(uploadPath);

            //저장 파일명 생성
            String fileSaveName = UUID.randomUUID()
                    + "_"
                    + userDTO.getUserProfileRealName()
                    + "."
                    + userDTO.getUserProfileExtension();

            //최종 저장 디렉토리 + 저장 파일명
            Path filePath = Paths.get(uploadFolder + fileSaveName);

            byte[] decodeBytes = Base64.getDecoder().decode(userDTO.getImage());

            //파일 생성
            Files.write(filePath, decodeBytes);

        } catch(IOException e) {
            e.printStackTrace();
        }

    }
}
