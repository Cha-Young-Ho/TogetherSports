package com.togethersports.tosproject.image;

import com.togethersports.tosproject.common.file.service.StorageService;
import com.togethersports.tosproject.common.file.util.Base64Decoder;
import com.togethersports.tosproject.common.file.util.NameGenerator;
import com.togethersports.tosproject.image.dto.ImageProperties;
import com.togethersports.tosproject.room.Room;
import com.togethersports.tosproject.room.dto.ImageOfRoomCRUD;
import com.togethersports.tosproject.room.dto.ImageSourcesOfRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;


@Slf4j
@RequiredArgsConstructor
@Service
public class RoomImageService {

    private final RoomImageRepository roomImageRepository;
    private final Base64Decoder base64Decoder;
    private final NameGenerator nameGenerator;
    private final StorageService storageService;
    private final ImageProperties imageProperties;

    @Value("${app.storage.root}")
    private String storageRoot;


    public void registerRoomImage(List<ImageOfRoomCRUD> roomOfCreateList, Room room){


        //이미지가 없을 경우
        if(roomOfCreateList.size() == 0){
            //이미지 설정
            ImageOfRoomCRUD defaultImage = ImageOfRoomCRUD.builder()
                    .imageSource(registDefaultImage(room.getExercise()))
                    .order(0)
                    .roomImageExtension("png")
                    .build();
            RoomImage roomImage = RoomImage.of(defaultImage, room, registDefaultImage(room.getExercise()));
            roomImageRepository.save(roomImage);
            return;
        }

        //이미지가 있을 경우
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
    @Transactional
    public void updateRoomImage(List<ImageOfRoomCRUD> imageList, Room room){

        List<RoomImage> roomImageList = room.getRoomImages();
        //로컬 사진 모두 삭제
        for(RoomImage roomImage : roomImageList){

            if(imageProperties.checkDefaultImage(roomImage.getImagePath())){
                continue;
            }

            storageService.delete(roomImage.getImagePath());

        }

        room.deleteImage();

        //사진 로컬 및 DB 저장
        registerRoomImage(imageList, room);

    }

    public ImageSourcesOfRoom getRoomImageSources(RoomImage roomImage){

        return ImageSourcesOfRoom.builder()
                .imageExtension(roomImage.getRoomImageExtension())
                .imageSource(storageService.getFileSource(roomImage.getImagePath()))
                .order(roomImage.getOrder())
                .build();


    }

    public void deleteLocalImage(Room room){
        for(RoomImage roomImage : room.getRoomImages()){
            storageService.delete(roomImage.getImagePath());
        }
    }

    public String registDefaultImage(String exercise){

        String path = imageProperties.getImageProperties().get(exercise);

        if(path == null){
            return imageProperties.getRoomDefaultImages().get("etc");
        }

        return path;

    }
}
