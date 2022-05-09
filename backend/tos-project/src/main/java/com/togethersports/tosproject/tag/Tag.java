package com.togethersports.tosproject.tag;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.togethersports.tosproject.room.Room;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Tag {

    @Id
    @GeneratedValue
    @Column(name = "TAG_ID")
    @JsonIgnore
    private Long id;

    //태그
    private String tag;

    //등록된 방
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "ROOM_ID")
    private Room room;

    public void updateRoom(Room room){
        this.room = room;
    }
}

