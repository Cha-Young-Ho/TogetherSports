package com.togethersports.tosproejct.room.dto;

import com.togethersports.tosproejct.room.Room;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

/**
 * <h1>RoomOfInfo</h1>
 * <p>
 * 방 조회를 위한 DTO
 * </p>
 * @author younghoCha
 */
@Getter
public class RoomOfInfo {
    private Long id;

    //방 설명 내용
    private String roomContent;

    //방 제목
    private String roomTitle;

    //방 지역
    private String roomArea;

    //방 운동종목
    private String exercise;

    //참여 인원
    private int limitPeopleCount;

    //현재 참여자 수
    private int participantCount;

    //방 시작 시간
    private LocalDateTime startAppointmentDate;

    //방 끝나는 시간
    private  LocalDateTime endAppointmentDate;

    //참여자
    //todo N : N 매핑
//    private List<User> participant;

    //방장
    private String host;

    //방 생성자
    private String creatorNickName;

    //방 이미지
    private List<ImageOfRoomInfo> roomImages;

    //태그
    private List<String> tags;

    //조회수
    private int viewCount;

    @Builder(access = AccessLevel.PRIVATE)
    private RoomOfInfo(Room roomEntity, List<ImageOfRoomInfo> roomImages, List<String> tag){
        this.creatorNickName = roomEntity.getCreateUser().getNickname();
        this.tags = tag;
        this.host = roomEntity.getHost().getNickname();
        this.endAppointmentDate = roomEntity.getEndAppointmentDate();
        this.startAppointmentDate = roomEntity.getStartAppointmentDate();
        this.roomArea = roomEntity.getRoomArea();
        this.exercise = roomEntity.getExercise();
        this.id = roomEntity.getId();
        this.limitPeopleCount = roomEntity.getLimitPeopleCount();
        this.participantCount = roomEntity.getParticipantCount();
        this.roomImages = roomImages;
        this.roomTitle = roomEntity.getRoomTitle();
        this.roomContent = roomEntity.getRoomContent();
        this.viewCount = roomEntity.getViewCount();
    }

    public static RoomOfInfo of(Room roomEntity, List<ImageOfRoomInfo> roomImages, List<String> tags){
        return RoomOfInfo.builder()
                .roomEntity(roomEntity)
                .roomImages(roomImages)
                .tag(tags)
                .build();
    }
}
