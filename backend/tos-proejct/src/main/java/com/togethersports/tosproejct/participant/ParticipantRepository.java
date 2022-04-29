package com.togethersports.tosproejct.participant;

import com.togethersports.tosproejct.room.Room;
import com.togethersports.tosproejct.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    boolean existsByUserAndRoom(User user, Room room);
}
