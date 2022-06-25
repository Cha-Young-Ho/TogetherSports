package com.togethersports.tosproject.session;

import com.togethersports.tosproject.participant.Participant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SocketSessionService {

    private final SocketSessionRepository socketSessionRepository;

    public Participant findParticipantBySessionId(String sessionId){

        SocketSession socketSessionEntity = socketSessionRepository.findBySocketSessionId(sessionId);

        return socketSessionEntity.getParticipant();
    }

    public void saveSessionId(String sessionId,Participant participant){
        SocketSession newSocketSession = SocketSession.builder()
                .socketSessionId(sessionId)
                .participant(participant)
                .build();
        socketSessionRepository.save(newSocketSession);

        participant.getSocketSessionList().add(newSocketSession);
    }

    public void deleteSession(String sessionId, Participant participant){
        socketSessionRepository.deleteBySocketSessionIdAndParticipant(sessionId, participant);
    }

}
