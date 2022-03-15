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
@Table(name = "T_ROOM_AREA")
public class RoomArea {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "AREA_SEQUENCE_ID")
    private String areaSequenceId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROOM_SEQUENCE_ID")
    private Room room;

    @Column(name = "AREA")
    private String area;

    @Column(name = "AREA_DETAIL")
    private String areaDetail;
}
