package com.swp391team3.koi_delivery_ordering_system.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IImageService {
    public String uploadImageToFileSystem(MultipartFile file) throws IOException;
    public byte[] getImageFromFileSystem(Long id) throws IOException;
    public String updateImageInFileSystem(Long id, MultipartFile newFile) throws IOException;
    public int getTotalImageInFileSystem();
    public List<String> getDuplicatedImageInFileSystem();
}
