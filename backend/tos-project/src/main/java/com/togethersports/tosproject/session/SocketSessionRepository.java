package com.togethersports.tosproject.session;

import com.togethersports.tosproject.participant.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SocketSessionRepository extends JpaRepository<SocketSession, Long> {

    SocketSession findBySocketSessionId(String socketSessionId);
    void deleteBySocketSessionIdAndParticipant(String socketSessionId, Participant participant);

}
