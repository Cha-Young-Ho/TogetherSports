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
@Entity
@Table
public class RoomImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long roomImageSequenceId;

    @ManyToOne
    @JoinColumn(name = "roomSequenceId")
    private Room room;

    @Column
    private String roomImagePath;

    @Column
    private String roomImageRealName;

    @Column
    private String roomImageSaveName;

    @Column
    private String roomImageExtension;


    public void updateRoom(Room room){
        this.room = room;
    }

}
