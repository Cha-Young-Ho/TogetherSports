package com.togethersports.tosproject.participant;


import com.togethersports.tosproject.room.Room;
import com.togethersports.tosproject.session.SocketSession;
import com.togethersports.tosproject.user.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.List;

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
    private Participant(User user, Room room, Status status){
        this.user = user;
        this.room = room;
        this.status = status;
    }

    private Participant(){
        ;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROOM_ID")
    private Room room;

    @Column(name = "STATUS")
    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "participant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SocketSession> socketSessionList;

    public static Participant of(User user, Room room){
        return Participant.builder()
                .user(user)
                .room(room)
                .status(Status.ONLINE)
                .build();
    }

    public void online(){
        this.status = Status.ONLINE;
    }

    public void offline(){
        this.status = Status.OFFLINE;
    }

    public void checkOnOffline(){
        if(this.socketSessionList.size() <= 0){
            offline();
            return;
        }

        online();
    }

    public void sessionRemove(String sessionId){
        int i = 0;
        for(SocketSession socketSession : getSocketSessionList()){
            if(socketSession.getSocketSessionId().equals(sessionId)){
                getSocketSessionList().remove(i);
                break;
            }
            i++;
        }
    }




}
