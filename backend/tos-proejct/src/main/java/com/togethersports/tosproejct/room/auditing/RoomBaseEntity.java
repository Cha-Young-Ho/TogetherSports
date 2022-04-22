package com.togethersports.tosproejct.room.auditing;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;


/**
 * <h1>RoomBaseEntity</h1>
 * <p>
 * Room 생성 및 수정 시간 BaseEntity
 * </p>
 *
 * @author younghoCha
 */
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@Getter
public class RoomBaseEntity {
    @JsonIgnore
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdTime;

    @JsonIgnore
    @LastModifiedDate
    private LocalDateTime updatedTime;
}
