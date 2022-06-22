package com.togethersports.tosproject.participant;


import com.togethersports.tosproject.chat.ChatController;
import com.togethersports.tosproject.chat.code.ChatCode;
import com.togethersports.tosproject.common.dto.Response;
import com.togethersports.tosproject.common.dto.WsResponse;
import com.togethersports.tosproject.participant.dto.UserOfOffline;
import com.togethersports.tosproject.participant.exception.NotParticipateRoomException;
import com.togethersports.tosproject.room.Room;
import com.togethersports.tosproject.room.RoomRepository;
import com.togethersports.tosproject.room.code.RoomCode;
import com.togethersports.tosproject.room.dto.UserAndRoomOfService;
import com.togethersports.tosproject.room.exception.NotFoundRoomException;
import com.togethersports.tosproject.user.User;
import com.togethersports.tosproject.user.UserRepository;
import com.togethersports.tosproject.user.code.UserCode;
import com.togethersports.tosproject.user.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * <h1>ParticipantService</h1>
 * <p>
 *     참여자 - 방 간의 관계테이블 Service
 * </p>
 *
 * @author younghoCha
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantRepository participantRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    //private final ChatController chatController;

    @Transactional
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

        room.getParticipants().add(participant);

        return true;
    }

    public boolean checkAttendance(User user, Room room){
        boolean attendance = participantRepository.existsByUserAndRoom(user, room);


        return participantRepository.existsByUserAndRoom(user, room);
    }

    public boolean checkAttendance(Long userId, Long roomId){

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundRoomException("해당하는 방을 찾을 수 없습니다."));

        return participantRepository.existsByUserAndRoom(user, room);
    }

    public void kickUser(Long kickedUserId, Long roomId){
        User userEntity = findUserEntityById(kickedUserId);
        Room roomEntity = findRoomEntityById(roomId);
        Participant participant = participantRepository.findByUserAndRoom(userEntity, roomEntity)
                .orElseThrow(() -> new UserNotFoundException("해당하는 사용자를 찾을 수 없어, 강퇴할 수 없습니다."));

        userEntity.out(participant);
        roomEntity.out(participant);
        participantRepository.delete(participant);
    }
    @Transactional
    public void out(User user, Room room){

        Participant participantEntity = participantRepository.findByUserAndRoom(user, room)
                .orElseThrow(() -> new NotParticipateRoomException("해당 방에 참여하지 않은 유저입니다."));


        user.out(participantEntity);
        room.out(participantEntity);

        participantRepository.delete(participantEntity);



    }

    @Transactional
    public void verifySession(String sessionId, Long roomId, Long userId){
        User userEntity = findUserEntityById(userId);
        Room roomEntity = findRoomEntityById(roomId);
        Participant participantEntity = participantRepository.findByUserAndRoom(userEntity, roomEntity)
                .orElseThrow(() -> new NotParticipateRoomException("해당 방에 참여하지 않은 유저입니다."));

        participantEntity.updateSessionId(sessionId);



    }

//    @Transactional
//    public String getSessionid(){
//
//
//        Participant participant = participantRepository.findByUserIdAndRoomId(1L, 1L)
//                .orElseThrow(() -> new NotParticipateRoomException());
//
//        return participant.getSocketSessionId();
//    }

    // 유저 엔티티 찾기
    public User findUserEntityById(Long userId){

        return  userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundRoomException("해당 방을 찾을 수 없습니다."));
    }
    // 룸 엔티티 찾기
    public Room findRoomEntityById(Long roomId){

        return roomRepository.findById(roomId)
                .orElseThrow(() -> new UserNotFoundException("해당 유저를 찾을 수 없습니다."));

    }
    // 유저 + 룸 엔티티 찾기
    public UserAndRoomOfService findEntityById(Long userId, Long roomId){
        User userEntity = findUserEntityById(userId);
        Room roomEntity = findRoomEntityById(roomId);

        return UserAndRoomOfService.builder()
                .room(roomEntity)
                .user(userEntity)
                .build();

    }
    /*
    participant에 session id 1:N으로 매핑해야 한다.
    그리고 모든 Session이 끊길 경우에 방에 오프라인 메세지를 보내야 한다.
     */

    //오프라인
//    public void offline(String sessionId, Long roomId){
//        Participant participant = participantRepository.findBySocketSessionId(sessionId);
//        User userEntity = participant.getUser();
//
//        chatController.sendServerMessage(roomId, WsResponse.of(ChatCode.SYSTEM_USER_OFFLINE, UserOfOffline.builder()
//                .userId(userEntity.getId())
//                .userNickname(userEntity.getNickname())
//                .build()));
//    }
//
//    //온라인
//    public void online(String sessionId, Long roomId){
//
//        Participant participant = participantRepository.findBySocketSessionId(sessionId);
//        User userEntity = participant.getUser();
//
//        chatController.sendServerMessage(roomId, WsResponse.of(ChatCode.SYSTEM_USER_OFFLINE, UserOfOffline.builder()
//                .userId(userEntity.getId())
//                .userNickname(userEntity.getNickname())
//                .build()));
//
//    }

}
