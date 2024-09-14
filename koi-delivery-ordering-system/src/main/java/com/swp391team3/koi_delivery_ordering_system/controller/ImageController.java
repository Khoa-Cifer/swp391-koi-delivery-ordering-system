package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.service.IImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("api/images")
@RequiredArgsConstructor
public class ImageController {
    private final IImageService imageService;

    @PostMapping("/fileSystem")
    public ResponseEntity<String> uploadImageToFIleSystem(@RequestParam("image") MultipartFile file) throws IOException {
        String uploadImage = imageService.uploadImageToFileSystem(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @GetMapping("/fileSystem")
    public ResponseEntity<byte[]> downloadImageFromFileSystem(@RequestParam("id") Long id) throws IOException {
        byte[] imageData = imageService.getImageFromFileSystem(id);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);

    }

    @PutMapping("/fileSystem/update")
    public ResponseEntity<String> deleteImageInFileSystem(@RequestParam("id") Long id, @RequestParam("image")MultipartFile file) throws IOException {
        String imagePath = imageService.updateImageInFileSystem(id, file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(imagePath);
    }
}
