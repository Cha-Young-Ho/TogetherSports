package com.togethersports.tosproejct.file;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FileDTO {

    private int fileSequenceId; // 세팅 값(자동)
    private int userSequenceId; // 받아와야할 값
    private String filePath; // 세팅 값
    private String fileOriginName; // 받아와야할 값
    private String fileSaveName; // 세팅 값 (UUID)
    private String fileType; //  받아와야할 값 (확장자명)
    private String fileSize; // 받아와야할 값
    private String fileSaveTime; // 세팅 값
}
