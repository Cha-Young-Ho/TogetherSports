package com.togethersports.tosproejct.file;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Slf4j
@RequiredArgsConstructor
@RequestMapping
@RestController
public class FileController {

    @PostMapping("/user/upload")
    public String userUpload(@RequestParam("file") MultipartFile mfile, RedirectAttributes redAttr) {



        return "redirect:";
    }

}
