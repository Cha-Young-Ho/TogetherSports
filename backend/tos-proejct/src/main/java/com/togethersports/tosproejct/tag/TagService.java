package com.togethersports.tosproejct.tag;

import com.togethersports.tosproejct.room.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
