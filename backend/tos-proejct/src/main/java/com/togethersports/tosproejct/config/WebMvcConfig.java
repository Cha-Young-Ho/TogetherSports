package com.togethersports.tosproejct.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private String imgUploadFolder = "C:/profileImg/";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        WebMvcConfigurer.super.addResourceHandlers(registry);

        registry.addResourceHandler("profileImg/**")
                .addResourceLocations("file:///" + imgUploadFolder)
                .setCachePeriod(60 * 10 * 6)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
    }
}
