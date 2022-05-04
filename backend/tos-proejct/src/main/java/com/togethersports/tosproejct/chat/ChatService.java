package com.togethersports.tosproejct.chat;

import com.togethersports.tosproejct.chat.dto.ChatOfHistory;
import com.togethersports.tosproejct.chat.dto.ChatOfMessage;
import com.togethersports.tosproejct.chat.dto.ChatOfPubRoom;
import com.togethersports.tosproejct.chat.dto.SampleMessage;
import com.togethersports.tosproejct.participant.ParticipantRepository;
import com.togethersports.tosproejct.participant.exception.NotParticipateRoomException;
import com.togethersports.tosproejct.room.Room;
import com.togethersports.tosproejct.room.RoomRepository;
import com.togethersports.tosproejct.room.exception.NotFoundRoomException;
import com.togethersports.tosproejct.user.User;
import com.togethersports.tosproejct.user.UserRepository;
import com.togethersports.tosproejct.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;



@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final ParticipantRepository participantRepository;
    private final ChatRepository chatRepository;

    public ChatOfPubRoom saveChat(SampleMessage message, Long room_id){

//        User userEntity = userRepository.findById(message.getUserId())
//                .orElseThrow(() -> new UserNotFoundException());
        User userEntity = userRepository.findById(1L)
                .orElseThrow(() -> new UserNotFoundException());

        Room roomEntity = roomRepository.findById(room_id)
                .orElseThrow(() -> new NotFoundRoomException());

        ChatMessage chatMessage = chatRepository.save(ChatMessage.of(message.getMessage(), userEntity, roomEntity));

        return ChatOfPubRoom.builder()
                .userId(1L)
                .nickname(userEntity.getNickname())
                .content(ChatOfMessage.builder().message(message.getMessage()).sendAt(chatMessage.getSendAt()).build())
                .build();

    }

    public void checkValidate(Long userId, Long roomId){
        User user = userRepository.findById(1L)
                .orElseThrow(() -> new UserNotFoundException("해당하는 유저를 찾을 수 없습니다."));
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundRoomException("해당하는 방을 찾을 수 없습니다."));
        if(participantRepository.existsByUserAndRoom(user, room)){


            return;
        }

        throw new NotParticipateRoomException();
    }

    public Page<ChatOfHistory> getChatHistory(Pageable pageable, Long roomId){
        Room roomEntity = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundRoomException("해당 방을 찾을 수 없습니다."));
        Page<ChatMessage> chatEntityList = chatRepository.findByRoom(roomEntity, pageable);
        Page<ChatOfHistory> pageList = chatEntityList.map(
                chat -> ChatOfHistory.builder()
                        .messageContent(
                                ChatOfMessage.builder()
                                        .message(chat.getMessage())
                                        .sendAt(chat.getSendAt()).build())
                        .nickname(chat.getUser().getNickname())
                        .userProfileImagePath(chat.getUser().getUserProfileImage())
                        .userId(chat.getUser().getId())
                        .build()
        );

        return pageList;
    }

    public ChatOfPubRoom getMessage(Long userId, SampleMessage message){

        User userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException());

        return ChatOfPubRoom.builder()
                .userId(userId)
                .nickname(userEntity.getNickname())
                .content(ChatOfMessage.builder().message(message.getMessage()).sendAt(LocalDateTime.now()).build())
                .build();
    }

}
