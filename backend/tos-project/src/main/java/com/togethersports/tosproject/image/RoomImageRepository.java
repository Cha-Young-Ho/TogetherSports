package com.togethersports.tosproject.image;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomImageRepository extends JpaRepository<RoomImage , Long> {
    void deleteAllByRoomId(Long roomId);
}
