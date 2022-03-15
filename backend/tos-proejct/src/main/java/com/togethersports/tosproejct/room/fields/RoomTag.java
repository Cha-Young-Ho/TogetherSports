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
@Table(name = "T_ROOM_TAG")
@Entity
public class RoomTag {

    @Id
    @Column(name = "TAG_SEQUENCE_ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tagSequenceID;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ROOM_SEQUENCE_ID")
    private Room room;

    @Column(name = "TAG")
    private String tag;


}
