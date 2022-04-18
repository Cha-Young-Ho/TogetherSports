package com.togethersports.tosproejct.room;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.togethersports.tosproejct.image.RoomImage;
import com.togethersports.tosproejct.room.auditing.RoomBaseEntity;
import com.togethersports.tosproejct.room.dto.RoomOfCreate;
import com.togethersports.tosproejct.room.dto.RoomOfUpdate;
import com.togethersports.tosproejct.tag.Tag;
import com.togethersports.tosproejct.user.User;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
/**
 * <h1>Room</h1>
 * <p>
 *     방 엔티티
 * </p>
 * @author younghocha
 */


@Getter
@Entity
@NoArgsConstructor
public class Room extends RoomBaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "ROOM_ID")
    private Long id;

    //방 설명 내용
    @Column(name = "ROOM_CONTENT")
    private String roomContent;

    //방 제목
    @Column(name = "ROOM_TITLE")
    private String roomTitle;

    //방 지역
    @Column(name = "ROOM_AREA")
    private String roomArea;

    //방 운동종목
    @Column(name = "EXERCISE")
    private String exercise;

    //참여 인원
    @Column(name = "LIMIT_PEOPLE_COUNT")
    private int limitPeopleCount;

    //현재 참여자 수
    @Column(name = "PRESENT_PEOPLE_COUNT")
    private int participantCount;

    //조회수
    @Column(name ="VIEW_COUNT")
    private int viewCount;

    //방 시작 시간
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Column(name = "START_APPOINTMENT_DATE")
    private LocalDateTime startAppointmentDate;

    //방 끝나는 시간
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Column(name = "END_APPOINTMENT_DATE")
    private  LocalDateTime endAppointmentDate;

    //참여자
    //todo N : N 매핑
//    private List<User> participant;

    //방장
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HOST_ID")
    private User host;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CREATE_USER_ID")
    private User createUser;

    //방 이미지
    @JsonIgnore
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<RoomImage> roomImages;

    //태그
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<Tag> tags;

    @Builder(access = AccessLevel.PRIVATE)
    private Room(RoomOfCreate roomOfCreate, User user){
        this.roomContent = roomOfCreate.getRoomContent();
        this.roomTitle = roomOfCreate.getRoomTitle();
        this.exercise = roomOfCreate.getExercise();
        this.endAppointmentDate = roomOfCreate.getEndAppointmentDate();
        this.startAppointmentDate = roomOfCreate.getStartAppointmentDate();
        this.limitPeopleCount = roomOfCreate.getLimitPeopleCount();
        this.host = user;
        this.participantCount = 1;
        this.createUser = user;
        this.roomArea = roomOfCreate.getRoomArea();
        this.viewCount = 0;
        this.createUser = user;

    }

    public static Room of(RoomOfCreate roomOfCreate, User user){

        return Room.builder()
                .roomOfCreate(roomOfCreate)
                .user(user)
                .build();
    }

    public void plusViewCount(){
        this.viewCount = viewCount + 1;
    }

    public void updateRoom(RoomOfUpdate roomOfUpdate){
        this.roomArea = roomOfUpdate.getRoomArea();
        this.limitPeopleCount = roomOfUpdate.getLimitPeopleCount();
        this.startAppointmentDate = roomOfUpdate.getStartAppointmentDate();
        this.endAppointmentDate = roomOfUpdate.getEndAppointmentDate();
        this.roomTitle = roomOfUpdate.getRoomTitle();
        this.roomContent = roomOfUpdate.getRoomContent();
    }

}
