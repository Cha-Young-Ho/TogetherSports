package com.togethersports.tosproject.participant;

import com.togethersports.tosproject.room.Room;
import com.togethersports.tosproject.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    boolean existsByUserAndRoom(User user, Room room);

    Optional<Participant> findByUserAndRoom(User user, Room room);
}
