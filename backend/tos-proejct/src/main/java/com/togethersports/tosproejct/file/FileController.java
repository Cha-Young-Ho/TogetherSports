package com.togethersports.tosproejct.file;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@RequestMapping
@RestController
public class FileController {

    private final FileService fileService;

    @PostMapping(value = "/user/upload", consumes =
            {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public String userImgUpload(@RequestParam("file") MultipartFile mfile, RedirectAttributes redAttr) throws IOException {

        log.info("----> {}", mfile.getSize()); // 이미지 크기
        log.info("----> {}", mfile.getBytes()); // byte 위치값
        log.info("----> {}", mfile.getContentType()); // image/png
        log.info("----> {}", mfile.getName());  // file
        log.info("----> {}", mfile.getOriginalFilename()); // 원본파일명
        log.info("----> {}", mfile.getResource()); // resource 명

        if(mfile.isEmpty()) {
            /* 파일을 업로드 하지 않았을 경우 처리 */
        }

        //fileService.userImgUpload(mfile);

        return "redirect:";
    }

}