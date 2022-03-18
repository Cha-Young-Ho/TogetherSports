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
@Table
@Entity
public class RoomTag {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tagSequenceID;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "roomSequenceId")
    private Room room;

    @Column
    private String tag;


}
