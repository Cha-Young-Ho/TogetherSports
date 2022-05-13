package com.togethersports.tosproject.room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Date;

public interface RoomRepository extends JpaRepository<Room, Long>, RoomRepositoryCustom {

    @Query("SELECT COUNT(*) FROM Room a WHERE DATE(Now()) < DATE(a.startAppointmentDate) AND a.limitPeopleCount > a.participantCount")
    Long getAvailableRoomCount();

    //Long countByStartAppointmentDateAfterAndLimitPeopleCountGreaterThanParticipantCount(LocalDateTime date);

}
