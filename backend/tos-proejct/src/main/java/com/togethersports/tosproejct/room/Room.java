package com.togethersports.tosproejct.room;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.togethersports.tosproejct.room.fields.RoomArea;
import com.togethersports.tosproejct.room.fields.RoomImage;
import com.togethersports.tosproejct.room.fields.RoomTag;
import com.togethersports.tosproejct.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@Table
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long roomSequenceId;

    @Column
    private String roomTitle;

    @Column
    private String roomContent;

    @Column
    private int limitPeopleCount;

    @Column(columnDefinition = "integer default 1")
    private int participantCount;

    @Column
    private String exercise;

    @Column(columnDefinition = "integer default 1")
    private int viewCount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    @Column
    private LocalDateTime startAppointmentDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    @Column
    private LocalDateTime endAppointmentDate;

    @OneToOne(mappedBy = "room")
    private RoomArea roomArea;

    @OneToMany(mappedBy = "room")
    private List<RoomImage> roomImages;


    @OneToMany(mappedBy = "room")
    private List<RoomTag> roomTagList;

    @ManyToOne
    @JoinColumn(name = "userSequenceId")
    private User host;


    //private List<User> participantList;





}
