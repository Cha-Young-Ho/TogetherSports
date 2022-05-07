package com.togethersports.tosproejct.participant.exception;

public class NotParticipateRoomException extends RuntimeException{
    public NotParticipateRoomException() {
        super();
    }

    public NotParticipateRoomException(String message) {
        super(message);
    }
}
