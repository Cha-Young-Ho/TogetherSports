package com.togethersports.tosproejct.room;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.togethersports.tosproejct.image.RoomImage;
import com.togethersports.tosproejct.tag.Tag;
import com.togethersports.tosproejct.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Room {

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
    private int presentPeopleCount;

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
    @ManyToOne
    @JoinColumn(name = "HOST_ID")
    private User host;

    @ManyToOne
    @JoinColumn(name = "CREATE_USER_ID")
    private User createUser;

    //방 이미지
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<RoomImage> roomImages;

    //태그
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<Tag> tag;

}
