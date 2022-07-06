package com.togethersports.tosproject.image;

import com.togethersports.tosproject.room.Room;
import com.togethersports.tosproject.room.dto.ImageOfRoomCRUD;
import lombok.*;

import javax.persistence.*;

/**
 * <h1>RoomImage</h1>
 * <p>
 *     방 이미지 엔티티
 * </p>
 * @author younghocha
 */

@Getter
@Entity
public class RoomImage {

    @Id
    @Column(name = "ROOM_IMAGE_ID")
    @GeneratedValue
    private Long id;

    //확장자
    @Column(name = "ROOM_IMAGE_EXTENSION")
    private String roomImageExtension;

    //이미지 소스
    @Column(name = "IMAGE_PATH")
    private String imagePath;

    //해당 방
    @ManyToOne
    @JoinColumn(name = "ROOM_ID")
    private Room room;

    @Column(name = "IMAGE_ORDER") //ORDER 는 예약어라서 이름 지정이 안됨
    private int order;

    protected RoomImage(){}

    @Builder(access = AccessLevel.PRIVATE)
    private RoomImage(ImageOfRoomCRUD imageOfRoomCRUD, Room room, String imagePath){
        this.roomImageExtension = imageOfRoomCRUD.getRoomImageExtension();
        this.room = room;
        this.imagePath = imagePath;
        this.order = imageOfRoomCRUD.getOrder();
    }

    //방 샏성 시, 엔티티 생성 메소드
    public static RoomImage of(ImageOfRoomCRUD imageOfRoomCRUD, Room room, String imagePath){

        return RoomImage.builder()
                .imagePath(imagePath)
                .room(room)
                .imageOfRoomCRUD(imageOfRoomCRUD)
                .build();
    }

}
