package com.togethersports.tosproject.tag;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {

    void deleteAllByRoomId(Long roomId);
}
