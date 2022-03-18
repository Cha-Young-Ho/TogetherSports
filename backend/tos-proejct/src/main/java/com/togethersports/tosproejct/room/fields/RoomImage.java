package com.togethersports.tosproejct.room.fields;

import com.togethersports.tosproejct.room.Room;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@DynamicInsert
@Entity
@Table
public class RoomImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long roomImageSequenceId;

    @ManyToOne
    @JoinColumn(name = "roomSequenceId")
    private Room room;

    @Column(columnDefinition = "varchar(255) default '/Users/younghocha/files/profile/img/TogetherSports_Default_Image.png'")
    private String roomImagePath;

    @Column(columnDefinition = "varchar(255) default 'Together_Sports_Image'")
    private String roomImageRealName;


    @Column(columnDefinition = "varchar(255) default 'Default_Image'")
    private String roomImageSaveName;

    @Column(columnDefinition = "varchar(255) default 'png'")
    private String roomImageExtension;


    public void updateRoom(Room room){
        this.room = room;
    }

}
