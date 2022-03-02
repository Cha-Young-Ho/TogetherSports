package com.togethersports.tosproejct.file;

import com.togethersports.tosproejct.room.Room;
import com.togethersports.tosproejct.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "T_FILE")
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "FILE_SEQUENCE_ID")
    private Long fileSequenceId;

    @ManyToOne
    @JoinColumn(name = "USER_SEQUENCE_ID")
    private User user;

//    @ManyToOne
//    @JoinColumn(name = "ROOMSEQUENCE_ID")
//    private Room room;

    @Column(name = "FILE_PATH")
    private String filePath;

    @Column(name = "FILE_ORIGIN_NAME")
    private String fileOriginName;

    @Column(name = "FILE_SAVE_NAME")
    private String fileSaveName;

    @Column(name = "FILE_TYPE")
    private String fileType;

    @Column(name = "FILE_SIZE")
    private String fileSize;

    @Column(name = "FILE_SAVE_TIME")
    private String fileSaveTime;
}
