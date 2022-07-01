package com.togethersports.tosproject.tag;

import com.togethersports.tosproject.room.Room;
import lombok.RequiredArgsConstructor;
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

    public void modifyTagFromRoomUpdate(List<Tag> tagList, Room room){
        room.deleteTag();

        for (Tag tag : tagList){
            tag.updateRoom(room);
            tagRepository.save(tag);
        }
    }
}
