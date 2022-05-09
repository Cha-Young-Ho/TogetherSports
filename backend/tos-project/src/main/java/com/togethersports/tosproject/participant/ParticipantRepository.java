package com.togethersports.tosproject.participant;

import com.togethersports.tosproject.room.Room;
import com.togethersports.tosproject.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    boolean existsByUserAndRoom(User user, Room room);
}
