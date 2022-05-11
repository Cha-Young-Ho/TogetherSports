package com.togethersports.tosproject.chat;

import com.togethersports.tosproject.chat.auditing.ChatBaseEntity;
import com.togethersports.tosproject.room.Room;
import com.togethersports.tosproject.user.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

/**
 * <h1>ChatMessage</h1>
 * <p>
 *     채팅 엔티티
 * </p>
 * @author younghocha
 */
@Getter
@Entity
public class ChatMessage extends ChatBaseEntity {

    private ChatMessage(){
        ;
    }
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "MESSAGE")
    private String message;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "ROOM_ID")
    private Room room;

    @Builder(access = AccessLevel.PRIVATE)
    private ChatMessage(String message, User user, Room room){
        this.message = message;
        this.user = user;
        this.room = room;
    }

    public static ChatMessage of(String message, User user, Room room){
        return ChatMessage.builder()
                .message(message)
                .user(user)
                .room(room)
                .build();
    }

}
