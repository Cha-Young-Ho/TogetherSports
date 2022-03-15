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
@Table(name = "T_ROOM_IMAGE")
public class RoomImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long roomImageSequenceId;

    @ManyToOne
    @JoinColumn(name = "ROOM_SEQUENCE_ID")
    private Room room;
}
