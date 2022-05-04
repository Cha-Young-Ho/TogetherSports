package com.togethersports.tosproejct.chat;

import com.togethersports.tosproejct.room.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<ChatMessage, Long> {
    Page<ChatMessage> findByRoom(Room roomId, Pageable pageable);

}
