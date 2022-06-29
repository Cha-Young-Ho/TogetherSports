package com.togethersports.tosproject.session;

import com.togethersports.tosproject.participant.Participant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
/**
 * <h1>SocketSessionService</h1>
 * <p>
 *     Socket Session 엔티티 CRUD 서비스 클래스
 * </p>
 * <p>
 *     Socket 엔티티 관련 CRUD에 대한 비즈니스 로직
 *
 * </p>
 *
 * @author younghoCha
 */
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
