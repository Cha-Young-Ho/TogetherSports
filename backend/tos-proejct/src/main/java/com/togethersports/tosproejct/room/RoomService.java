package com.togethersports.tosproejct.room;

import com.togethersports.tosproejct.common.util.ParsingEntityUtils;
import com.togethersports.tosproejct.image.RoomImageService;
import com.togethersports.tosproejct.participant.Participant;
import com.togethersports.tosproejct.participant.ParticipantService;
import com.togethersports.tosproejct.room.code.RoomCode;
import com.togethersports.tosproejct.room.dto.*;
import com.togethersports.tosproejct.room.exception.NotFoundRoomException;
import com.togethersports.tosproejct.tag.Tag;
import com.togethersports.tosproejct.tag.TagService;
import com.togethersports.tosproejct.user.User;
import com.togethersports.tosproejct.user.UserRepository;
import com.togethersports.tosproejct.user.UserService;
import com.togethersports.tosproejct.user.dto.UserOfOtherInfo;
import com.togethersports.tosproejct.user.exception.NotEnteredInformationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
/**
 * <h1>RoomService</h1>
 * <p>
 *     Room과 관련된 비즈니스 로직
 * </p>
 * <p>
 *     CRUD 및 참가와 퇴장 로직을 수행하는 클래스이다.
 * </p>
 *
 * @author younghoCha
 */
@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class RoomService {
    private final ParticipantService participantService;
    private final TagService tagService;
    private final ParsingEntityUtils parsingEntityUtils;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final RoomImageService roomImageService;
    private final UserService userService;

    //방 생성
    public void createRoom(User user, RoomOfCreate roomOfCreate){

        //요청 유저의 엔티티 찾기
        User userEntity = userRepository.findById(user.getId())
                .orElseThrow(() -> new UsernameNotFoundException("해당 유저를 찾을 수 없습니다."));

        //추가 정보 입력했는지 확인
        if(userEntity.getNickname() == null){
            throw new NotEnteredInformationException();
        }

        /*
         * 방 엔티티 만들기
         * 1. List<String>을 List<Tag>로 변환 후 저장
         * 2. List<Image>를 모두 저장
         * 3. 엔티티 생성
         * 4. 저장
         */
        //방 엔티티 만들기
        Room roomEntity = Room.of(roomOfCreate, userEntity);

        //방 저장
        roomRepository.save(roomEntity);

        //-- Tag --
        //List<String>을 List<Tag>로 변환
        List<Tag> tagList = parsingEntityUtils.parsingStringToTagEntity(roomOfCreate.getTags());

        //tag 저장
        tagService.saveTagFromRoomCreation(tagList, roomEntity);

        // -- Image --
        // image 로컬에 저장
        roomImageService.registerRoomImage(roomOfCreate.getRoomImages(), roomEntity);
    }

    //방 설명 페이지 조회
    public RoomOfInfo getRoomInfo(User user, Long roomId){

        Room roomEntity = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundRoomException("해당 방을 찾을 수 없습니다."));

        //List<RoomImage> -> List<ImageOfRoomInfo>
        List<ImageOfRoomInfo> imageOfRoomInfos =
                parsingEntityUtils.parsingRoomImageToRoomInfoImage(roomEntity.getRoomImages());

        //List<Tag> -> List<String>
        List<String> tag =
                parsingEntityUtils.parsingTagEntityToString(roomEntity.getTags());
        //조회수 증가
        roomEntity.plusViewCount();

        return RoomOfInfo.of(roomEntity, imageOfRoomInfos, tag);

    }

    //방 수정
    public void modifyRoomInfo(RoomOfUpdate roomOfUpdate){
        Room roomEntity = roomRepository.findById(roomOfUpdate.getId())
                .orElseThrow(() -> new NotFoundRoomException("해당 방을 찾을 수 없습니다."));

        //방 인원
        //ToDo 방 인원 체크 로직 추가해야함(참여 인원 > 변경 최대 인원 -> 변경 불가)

        //-- Tag --
        // Tag Service 에서 모든 DB값 삭제 후, 넘어온 값들로 새롭게 매핑
        List<Tag> tagList = parsingEntityUtils.parsingStringToTagEntity(roomOfUpdate.getTag());
        tagService.modifyTagFromRoomUpdate(tagList, roomEntity);

        //-- Image --
        // Image Service 에서 모든 DB값 삭제 후, 넘어온 값들로 새롭게 매핑 및 저장
        roomImageService.updateRoomImage(roomOfUpdate.getRoomImages(), roomEntity);

        //-- update Room Entity --
        roomEntity.updateRoom(roomOfUpdate);

    }

    public Page<RoomOfList> roomFields(FieldsOfRoomList fieldsOfRoomList, Pageable pageable){
        Page<RoomOfList> list = roomRepository.searchAll(fieldsOfRoomList, pageable);

        return list;
    }

    public RoomOfParticipate<?> participateRoom(User currentUser, Long roomId){
        Room roomEntity = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundRoomException("해당 방을 찾을 수 없습니다."));

        //인원이 가득찬 경우
        if(roomEntity.getParticipantCount() >= roomEntity.getLimitPeopleCount()){
            return RoomOfParticipate.builder()
                    .status(RoomCode.FULL_ROOM)
                    .build();
        }

        //시간이 지난 방인 경우
        if(roomEntity.getEndAppointmentDate().isBefore(LocalDateTime.now())){
            return RoomOfParticipate.builder()
                    .status(RoomCode.TIME_OUT_ROOM)
                    .build();
        }

        // 참가 저장
        boolean isParticipation = participantService.save(currentUser, roomEntity);

        // 참가한 경우
        if(isParticipation) {
            // 참가 인원 추가
            roomEntity.participate();
        }
        // 정상적으로 참여가 가능한 경우
        return RoomOfParticipate.builder()
                .status(RoomCode.PARTICPATE_ROOM)
                .roomOfInfo(getRoomInfo(currentUser, roomId))
                .participates(getParticipantsInfo(roomEntity.getParticipants()))
                .build();
    }

    public List<UserOfOtherInfo> getParticipantsInfo(List<Participant> participantList){
        List<UserOfOtherInfo> userOfOtherInfoList = new ArrayList<>();
        for (Participant user : participantList){
            userOfOtherInfoList.add(userService.getOtherInfo(user.getId()));
        }

        return userOfOtherInfoList;

    }
}
