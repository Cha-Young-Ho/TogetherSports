package com.togethersports.tosproject.participant;

import com.togethersports.tosproject.room.Room;
import com.togethersports.tosproject.room.RoomRepository;
import com.togethersports.tosproject.room.exception.NotFoundRoomException;
import com.togethersports.tosproject.user.User;
import com.togethersports.tosproject.user.UserRepository;
import com.togethersports.tosproject.user.exception.UserNotFoundException;
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
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
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

    public boolean checkAttendance(User user, Room room){
        return participantRepository.existsByUserAndRoom(user, room);
    }

    public boolean checkAttendance(Long userId, Long roomId){

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundRoomException("해당하는 방을 찾을 수 없습니다."));

        return participantRepository.existsByUserAndRoom(user, room);
    }

    public void kickUser(Long kickedUserId){
        Participant user = participantRepository.findById(kickedUserId)
                .orElseThrow(() -> new UserNotFoundException("해당하는 사용자를 찾을 수 없어, 강퇴할 수 없습니다."));
        participantRepository.delete(user);
    }

}
