package com.togethersports.tosproject.participant;


import com.togethersports.tosproject.room.Room;
import com.togethersports.tosproject.user.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

/**
 * <h1>Participant</h1>
 * <p>
 *     참여자 - 방 간의 관계테이블 엔티티
 * </p>
 * <p>
 *     참여자와 방은 N:M 매핑 관계이므로 관계엔티티 생성
 * </p>
 *
 * @author younghoCha
 */
@Entity
@Getter
public class Participant {

    @Builder(access = AccessLevel.PRIVATE)
    private Participant(User user, Room room){
        this.user = user;
        this.room = room;
    }

    private Participant(){
        ;
    }

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROOM_ID")
    private Room room;

    @Column(name = "SOCKET_SESSION_ID")
    private String socketSessionId;

    public static Participant of(User user, Room room){
        return Participant.builder()
                .user(user)
                .room(room)
                .build();
    }

    public void updateSessionId(String sessionId){
        this.socketSessionId = sessionId;
    }


}
