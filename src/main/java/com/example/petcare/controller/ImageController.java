package com.example.petcare.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class ImageController {
    @GetMapping("/image/{type}/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String type ,@PathVariable String filename) {
        try{
            Path filePath = Paths.get("C:\\spring_image_test\\"+type+"\\"+filename);
            Resource resource = new UrlResource(filePath.toUri());

            if(resource.exists() && resource.isReadable()) {
                String contentType;
                if (filename.endsWith(".png")) {
                    contentType = MediaType.IMAGE_PNG_VALUE;
                } else if (filename.endsWith(".jpeg") || filename.endsWith(".jpg")) {
                    contentType = MediaType.IMAGE_JPEG_VALUE;
                } else {
                    // 지원하지 않는 파일 형식인 경우
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).build();
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }

        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
