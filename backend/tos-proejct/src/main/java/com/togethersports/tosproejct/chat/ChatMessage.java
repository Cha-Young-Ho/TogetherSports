package com.togethersports.tosproejct.chat;

import com.togethersports.tosproejct.chat.auditing.ChatBaseEntity;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;


@Getter
@Entity
public class ChatMessage extends ChatBaseEntity {

    @Id
    private Long id;

    @Column
    private String message;

}
