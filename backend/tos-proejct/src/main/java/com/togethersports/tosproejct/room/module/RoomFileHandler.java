package com.togethersports.tosproejct.room.module;

import com.togethersports.tosproejct.room.fields.RoomImage;
import com.togethersports.tosproejct.room.roomDTO.RoomImageDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.Base64Utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Slf4j
@AllArgsConstructor
@NoArgsConstructor
@Component
public class RoomFileHandler {
    private String uploadFolder = System.getProperty("user.home") + "/files/room/img/";

    public List<RoomImage> manageDefaultImage(){
        log.info("여기22 실행");
        List<RoomImage> defaultRoomImageList = new ArrayList<>();

        defaultRoomImageList.add(RoomImage.builder().roomImageExtension("png").build());
        return defaultRoomImageList;
    }

    // DTO 를 로컬에 저장하고, DB필드에 맞게 객체 생성 후 반환
    public List<RoomImage> manageImages(List<RoomImageDTO> roomImages){
        List<RoomImage> roomImageList = new ArrayList<>();
        for(RoomImageDTO roomImageDTO : roomImages){
            RoomImage roomImageToDB = saveToLocal(roomImageDTO);
            roomImageList.add(roomImageToDB);
        }

        return roomImageList;
    }

    public RoomImage saveToLocal(RoomImageDTO roomImageDTO) {
        try {

            String extension = roomImageDTO.getRoomImageExtension();

            Path uploadPath = Paths.get(uploadFolder);

            //디렉토리 생성
            Files.createDirectories(uploadPath);

            //나노초 날짜 생성
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter dateTimeFormatter =
                    DateTimeFormatter.ofPattern("yyyyMMdd");
            String current_date = now.format(dateTimeFormatter);


            //저장 파일명 생성
            String fileSaveName = "TogetherSports_" + current_date + "_" + System.nanoTime() + "." + extension;

            //최종 저장 디렉토리 + 저장 파일명
            Path filePath = Paths.get(uploadFolder + fileSaveName);

            byte[] decodeBytes = Base64.getDecoder().decode(Base64Utils.encodeToUrlSafeString(roomImageDTO.getImageSource().getBytes()));

            //파일 생성
            Files.write(filePath, decodeBytes);

            //DB에 저장할 RoomImage 객체 생성 및 반환


            return RoomImage.builder()
                    .roomImageExtension(extension)
                    .roomImagePath(uploadFolder + fileSaveName)
                    .roomImageRealName(roomImageDTO.getRoomImageRealName())
                    .roomImageSaveName(fileSaveName)
                    .build();


        } catch (IOException e) {
            log.info("IO 발생");
            e.printStackTrace();
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (Exception e){
            e.printStackTrace();
        }

        return null;
    }
}
