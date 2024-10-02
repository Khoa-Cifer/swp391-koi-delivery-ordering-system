package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.File;
import com.swp391team3.koi_delivery_ordering_system.service.IFileService;
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
public class FileController {
    private final IFileService imageService;

    @PostMapping("/uploadFileSystem")
    public ResponseEntity<?> uploadImageToFIleSystem(@RequestParam("image") MultipartFile file) throws IOException {
        File uploadImage = imageService.uploadFileToFileSystem(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @GetMapping("/getFileSystem")
    public ResponseEntity<byte[]> downloadImageFromFileSystem(@RequestParam("id") Long id) throws IOException {
        byte[] imageData = imageService.getFileFromFileSystem(id);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }

    @PutMapping("/fileSystem/update")
    public ResponseEntity<String> deleteImageInFileSystem(@RequestParam("id") Long id, @RequestParam("image")MultipartFile file) throws IOException {
        String imagePath = imageService.updateFileInFileSystem(id, file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(imagePath);
    }
}
