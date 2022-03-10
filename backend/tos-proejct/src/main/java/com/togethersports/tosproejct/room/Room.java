//package com.togethersports.tosproejct.room;
//
//import com.fasterxml.jackson.annotation.JsonFormat;
//import com.togethersports.tosproejct.enums.Tag;
//import com.togethersports.tosproejct.user.User;
//import etc.Area;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//import javax.persistence.*;
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Getter
//@Builder
//@Entity
//@Table(name = "T_ROOM")
//@NoArgsConstructor
//@AllArgsConstructor
//public class Room {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long roomSequenceId;
//
//    @Column(name = "ROOM_TITLE")
//    private String roomTitle;
//
//    @Column(name = "ROOM_CONTENT")
//    private String roomContent;
//
//    @Column(name = "LIMIT_PEOPLE_COUNT")
//    private int limitPeopleCount;
//
//    @Column(name = "PARTICIPANT_COUNT")
//    private int participantCount;
//
//    @Column(name = "EXERCISE")
//    private String exercise;
//
//    @Column(name = "VIEW_COUNT")
//    private int viewCount;
//
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
//    @Column(name = "APPOINTMENT_DATE")
//    private LocalDateTime appointmentDate;
//
//    @Column(name = "AREA")
//    private Area area;
//
//    private List<RoomImage> roomImageList;
//
//    private List<Tag> tagList;
//
//    @ManyToOne
//    @JoinColumn(name = "")
//    private User host;
//
//    private List<User> participantList;
//
//
//
//
//
//}
