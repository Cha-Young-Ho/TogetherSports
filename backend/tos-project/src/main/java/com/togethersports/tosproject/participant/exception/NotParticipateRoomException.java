package com.togethersports.tosproject.participant.exception;

public class NotParticipateRoomException extends RuntimeException{
    public NotParticipateRoomException() {
        super();
    }

    public NotParticipateRoomException(String message) {
        super(message);
    }
}
