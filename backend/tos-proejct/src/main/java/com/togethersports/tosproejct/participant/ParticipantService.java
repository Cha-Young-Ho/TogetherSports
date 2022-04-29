package com.togethersports.tosproejct.participant;

import com.togethersports.tosproejct.room.Room;
import com.togethersports.tosproejct.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * <h1>ParticipantService</h1>
 * <p>
 *     참여자 - 방 간의 관계테이블 Service
 * </p>
 *
 * @author younghoCha
 */
@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantRepository participantRepository;

    public boolean save(User user, Room room){

        //해당 유저가 참여했는지 확인, 참여한 경우와 참여하지 않은 경우에 따른 로직 분기
        //참여했을 경우
        if(participantRepository.existsByUserAndRoom(user, room)){
            return false;
        }

        //참여하지 않았을 경우
        //관계테이블에 저장
        Participant participant = Participant.of(user, room);

        participantRepository.save(participant);

        return true;
    }


}
