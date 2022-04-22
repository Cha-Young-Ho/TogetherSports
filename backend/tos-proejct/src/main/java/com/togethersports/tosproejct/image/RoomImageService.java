package com.togethersports.tosproejct.image;

import com.togethersports.tosproejct.common.file.service.StorageService;
import com.togethersports.tosproejct.common.file.util.Base64Decoder;
import com.togethersports.tosproejct.common.file.util.NameGenerator;
import com.togethersports.tosproejct.room.Room;
import com.togethersports.tosproejct.room.dto.ImageOfRoomCRUD;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@RequiredArgsConstructor
@Service
public class RoomImageService {

    private final RoomImageRepository roomImageRepository;
    private final Base64Decoder base64Decoder;
    private final NameGenerator nameGenerator;
    private final StorageService storageService;
    public void registerRoomImage(List<ImageOfRoomCRUD> roomOfCreateList, Room room){

        for(ImageOfRoomCRUD imageOfRoomCRUD : roomOfCreateList){

            //방 이미지를 지정하지 않았을 경우
            if(imageOfRoomCRUD.getImageSource() == null
                || imageOfRoomCRUD.getImageSource().equals("정보 없음")){

                //기본 이미지에 대한 DTO 생성(RoomImage 생성 메서드는 1개만 존재시키려는 의도)
                //fixme 기본 이미지 경로 수정해야함
                ImageOfRoomCRUD defaultImage = ImageOfRoomCRUD.builder()
                        .imageSource("정보 없음")
                        .order(0)
                        .roomImageExtension("png")
                        .build();
                RoomImage roomImage = RoomImage.of(defaultImage, room, "/Users/chayeongho/Pictures/User/User.png");
                roomImageRepository.save(roomImage);
                return;
            }

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
