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
@Table(name = "T_ROOM")
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ROOM_SEQUENCE_ID")
    private Long roomSequenceId;

    @Column(name = "ROOM_TITLE")
    private String roomTitle;

    @Column(name = "ROOM_CONTENT")
    private String roomContent;

    @Column(name = "LIMIT_PEOPLE_COUNT")
    private int limitPeopleCount;

    @Column(name = "PARTICIPANT_COUNT", columnDefinition = "integer default 1")
    private int participantCount;

    @Column(name = "EXERCISE")
    private String exercise;

    @Column(name = "VIEW_COUNT", columnDefinition = "integer default 1")
    private int viewCount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    @Column(name = "START_APPOINTMENT_DATE")
    private LocalDateTime startAppointmentDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    @Column(name = "END_APPOINTMENT_DATE")
    private LocalDateTime endAppointmentDate;

    @OneToOne(mappedBy = "room")
    private RoomArea roomArea;

    @OneToMany(mappedBy = "room")
    private List<RoomImage> roomImages;


    @OneToMany(mappedBy = "room")
    private List<RoomTag> roomTagList;

    @ManyToOne
    @JoinColumn(name = "USER_SEQUENCE_ID")
    private User host;


    //private List<User> participantList;





}
