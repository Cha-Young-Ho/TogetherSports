package com.togethersports.tosproject.image.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Map;

@Slf4j
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

    public boolean checkDefaultImage(String path){
        if(this.roomDefaultImages.containsValue(path)){
            return true;
        }

        return false;
    }

}
