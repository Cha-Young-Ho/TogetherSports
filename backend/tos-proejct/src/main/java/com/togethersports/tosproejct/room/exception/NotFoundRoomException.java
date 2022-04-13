package com.togethersports.tosproejct.room.exception;


/**
 * <h1>NotFoundRoomException</h1>
 * <p>
 *     id로 조회하는 방이 존재하지 않을 경우의 예외
 * </p>
 *
 * @author younghoCha
 */
public class NotFoundRoomException extends RuntimeException{
    public NotFoundRoomException() {
        super();
    }

    public NotFoundRoomException(String message) {
        super(message);
    }
}
