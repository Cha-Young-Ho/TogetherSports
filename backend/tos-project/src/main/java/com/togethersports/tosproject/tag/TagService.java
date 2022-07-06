package com.togethersports.tosproject.tag;

import com.togethersports.tosproject.room.Room;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class TagService {


    private final TagRepository tagRepository;

    public void saveTagFromRoomCreation(List<Tag> tagList, Room room){

        for (Tag tag : tagList){
            tag.updateRoom(room);
            tagRepository.save(tag);
        }
    }
    @Transactional
    public void modifyTagFromRoomUpdate(List<Tag> tagList, Room room){
        log.info("받은 tag = {}", tagList.size());
        room.deleteTag();
        log.info("delete 후 tag size = {}", room.getTags().size());
        for (Tag tag : tagList){
            tag.updateRoom(room);
            tagRepository.save(tag);
        }

        room.updateTag(tagList);

        log.info("룸에 tag 넣고 난 후 size = {}", room.getTags().size());


    }
}
