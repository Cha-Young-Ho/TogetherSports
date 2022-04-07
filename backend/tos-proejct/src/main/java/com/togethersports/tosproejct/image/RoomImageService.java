package com.togethersports.tosproejct.image;

import com.togethersports.tosproejct.common.file.service.StorageService;
import com.togethersports.tosproejct.common.file.util.Base64Decoder;
import com.togethersports.tosproejct.common.file.util.NameGenerator;
import com.togethersports.tosproejct.room.Room;
import com.togethersports.tosproejct.room.dto.ImageOfRoomCreate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;


@RequiredArgsConstructor
@Service
public class RoomImageService {

    private final RoomImageRepository roomImageRepository;
    private final Base64Decoder base64Decoder;
    private final NameGenerator nameGenerator;
    private final StorageService storageService;
    public void createRoomImageFromCreateRoom(List<ImageOfRoomCreate> roomOfCreateList, Room room){

        for(ImageOfRoomCreate imageOfRoomCreate : roomOfCreateList){

            //방 이미지를 지정하지 않았을 경우
            if(imageOfRoomCreate.getImageSource() == null
                || imageOfRoomCreate.getImageSource().equals("정보 없음")){

                //기본 이미지에 대한 DTO 생성(RoomImage 생성 메서드는 1개만 존재시키려는 의도)
                //fixme 기본 이미지 경로 수정해야함
                ImageOfRoomCreate defaultImage = ImageOfRoomCreate.builder()
                        .imageSource("정보 없음")
                        .order(0)
                        .roomImageExtension("png")
                        .build();
                RoomImage roomImage = RoomImage.of(defaultImage, room, "ABC");
                roomImageRepository.save(roomImage);
                return;
            }

            //방 이미지를 지정했을 경우
            //방 이미지 저장
            String encodedImageSource = imageOfRoomCreate.getImageSource();
            byte[] imageSource = base64Decoder.decode(encodedImageSource);
            String extension = imageOfRoomCreate.getRoomImageExtension();
            String fileName = nameGenerator.generateRandomName().concat(".").concat(extension);
            String imagePath = storageService.store(imageSource, fileName);

            //이미지 엔티티 생성
            RoomImage roomImage = RoomImage.of(imageOfRoomCreate, room, imagePath);

            roomImageRepository.save(roomImage);



        }
    }
}
