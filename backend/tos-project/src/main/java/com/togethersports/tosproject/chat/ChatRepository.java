package com.togethersports.tosproject.chat;

import com.togethersports.tosproject.room.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
/**
 * <h1>ChatRepository</h1>
 * <p>
 *     채팅 DB 저장 Repository(DAO)
 * </p>
 * @author younghocha
 */
public interface ChatRepository extends JpaRepository<ChatMessage, Long> {
    Page<ChatMessage> findByRoomOrderBySendAtDesc(Room roomId, Pageable pageable);

}
