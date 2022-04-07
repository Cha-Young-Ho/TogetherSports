package com.togethersports.tosproejct.room;

import com.togethersports.tosproejct.common.file.util.Base64Decoder;
import com.togethersports.tosproejct.common.file.util.NameGenerator;
import com.togethersports.tosproejct.common.util.ParsingEntityUtils;
import com.togethersports.tosproejct.image.RoomImageService;
import com.togethersports.tosproejct.room.dto.RoomOfCreate;
import com.togethersports.tosproejct.tag.Tag;
import com.togethersports.tosproejct.tag.TagService;
import com.togethersports.tosproejct.user.User;
import com.togethersports.tosproejct.user.UserRepository;
import com.togethersports.tosproejct.user.exception.NotEnteredInformationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class RoomService {


    private final TagService tagService;
    private final ParsingEntityUtils parsingEntityUtils;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final RoomImageService roomImageService;


    //방 생성
    public void createRoom(User user, RoomOfCreate roomOfCreate){

        //요청 유저의 엔티티 찾기
        User userEntity = userRepository.findById(user.getId())
                .orElseThrow(() -> new UsernameNotFoundException("해당 유저를 찾을 수 없습니다."));

        //추가 정보 입력했는지 확인
        if(userEntity.getNickname() == null){
            new NotEnteredInformationException();
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
        List<Tag> tagList = parsingEntityUtils.parsingStringToTagEntity(roomOfCreate.getTag());

        //tag 저장
        tagService.saveTagFromRoomCreation(tagList, roomEntity);

        log.info("roomEntity = {}", roomEntity.getCreateUser().getEmail());
        log.info("roomEntity22 = {}", roomEntity.getRoomArea());

        // -- Image --
        // image 로컬에 저장
        roomImageService.createRoomImageFromCreateRoom(roomOfCreate.getImages(), roomEntity);





    }
}
