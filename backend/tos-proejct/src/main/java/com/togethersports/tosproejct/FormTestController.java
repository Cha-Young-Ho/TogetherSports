package com.togethersports.tosproejct;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@RequiredArgsConstructor
@RequestMapping
@Controller
public class FormTestController {

    @GetMapping("/")
    public String uploadForm(Model model) {

        model.addAttribute("message", "이미지 업로드 테스트 폼");

        return "uploadTestForm";
    }
}
