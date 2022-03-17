package com.togethersports.tosproejct.room.fields;

import com.togethersports.tosproejct.room.Room;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
@Table
public class RoomArea {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long areaSequenceId;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "roomSequenceId")
    private Room room;

    @Column
    private String area;

    @Column
    private String areaDetail;

    public void updateRoom(Room room){
        this.room = room;
    }
}
