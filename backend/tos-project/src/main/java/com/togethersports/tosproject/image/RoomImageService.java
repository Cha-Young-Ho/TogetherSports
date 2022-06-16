package com.togethersports.tosproject.image;

import com.togethersports.tosproject.common.file.service.StorageService;
import com.togethersports.tosproject.common.file.util.Base64Decoder;
import com.togethersports.tosproject.common.file.util.NameGenerator;
import com.togethersports.tosproject.room.Room;
import com.togethersports.tosproject.room.dto.ImageOfRoomCRUD;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;


@Slf4j
@RequiredArgsConstructor
@Service
public class RoomImageService {

    private final RoomImageRepository roomImageRepository;
    private final Base64Decoder base64Decoder;
    private final NameGenerator nameGenerator;
    private final StorageService storageService;
    public void registerRoomImage(List<ImageOfRoomCRUD> roomOfCreateList, Room room){



        if(roomOfCreateList.size() == 0){
            ImageOfRoomCRUD defaultImage = ImageOfRoomCRUD.builder()
                    .imageSource("https://together-sports.com/images/default_room_image.png")
                    .order(0)
                    .roomImageExtension("png")
                    .build();
            RoomImage roomImage = RoomImage.of(defaultImage, room, "https://together-sports.com/images/default_room_image.png");
            roomImageRepository.save(roomImage);
            return;
        }
        for(ImageOfRoomCRUD imageOfRoomCRUD : roomOfCreateList){

            //방 이미지를 지정했을 경우
            //방 이미지 저장
            String encodedImageSource = imageOfRoomCRUD.getImageSource();
            byte[] imageSource = base64Decoder.decode(encodedImageSource);
            String extension = imageOfRoomCRUD.getRoomImageExtension();
            String fileName = nameGenerator.generateRandomName().concat(".").concat(extension);
            String imagePath = storageService.store(imageSource, fileName);

            //이미지 엔티티 생성
            RoomImage roomImage = RoomImage.of(imageOfRoomCRUD, room, imagePath);

            roomImageRepository.save(roomImage);



        }
    }

    public void updateRoomImage(List<ImageOfRoomCRUD> imageList, Room room){
        //사진 모두 삭제
        roomImageRepository.deleteAllByRoomId(room.getId());

        //사진 로컬 및 DB 저장
        registerRoomImage(imageList, room);

    }
}
