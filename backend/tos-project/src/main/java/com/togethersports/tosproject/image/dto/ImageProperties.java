package com.togethersports.tosproject.image.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Map;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "app")
public class ImageProperties {

    private Map<String, String> roomDefaultImages;

    public ImageProperties(Map<String, String> roomDefaultImages){
        this.roomDefaultImages = roomDefaultImages;
    }

    public Map<String, String> getImageProperties(){
        return this.roomDefaultImages;
    }
}