package com.togethersports.tosproejct.image;

import com.togethersports.tosproejct.room.Room;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * <h1>RoomImage</h1>
 * <p>
 *     방 이미지 엔티티
 * </p>
 * @author younghocha
 */

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class RoomImage {

    @Id
    @Column(name = "ROOM_IMAGE_ID")
    private Long id;

    //확장자
    @Column(name = "ROOM_IMAGE_EXTENSION")
    private String roomImageExtension;

    //이미지 소스
    @Column(name = "IMAGE_PATH")
    private String imagePath;

    //해당 방
    @ManyToOne
    @JoinColumn(name = "id")
    private Room room;
}
