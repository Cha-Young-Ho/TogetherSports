package com.togethersports.tosproejct.chat;

import com.togethersports.tosproejct.chat.dto.SampleMessage;
import com.togethersports.tosproejct.participant.Participant;
import com.togethersports.tosproejct.participant.ParticipantRepository;
import com.togethersports.tosproejct.participant.exception.NotParticipateRoomException;
import com.togethersports.tosproejct.room.Room;
import com.togethersports.tosproejct.room.RoomRepository;
import com.togethersports.tosproejct.room.exception.NotFoundRoomException;
import com.togethersports.tosproejct.user.User;
import com.togethersports.tosproejct.user.UserRepository;
import com.togethersports.tosproejct.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final ParticipantRepository participantRepository;
    private final ChatRepository chatRepository;

    public void saveChat(SampleMessage message, Long room_id){
        // token 받기


    }

    public void checkValidate(Long userId, Long roomId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("해당하는 유저를 찾을 수 없습니다."));
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundRoomException("해당하는 방을 찾을 수 없습니다."));
        if(participantRepository.existsByUserAndRoom(user, room)){
            return;
        }

        throw new NotParticipateRoomException();
    }


}
