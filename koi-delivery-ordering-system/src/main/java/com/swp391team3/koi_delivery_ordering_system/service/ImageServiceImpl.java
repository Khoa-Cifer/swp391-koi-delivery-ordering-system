package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements IImageService {
    private final ImageRepository imageRepository;
    private final String FOLDER_PATH = "data/";

    @Override
    public String uploadImageToFileSystem(MultipartFile file) throws IOException {
        return "";
    }

    @Override
    public byte[] getImageFromFileSystem(Long id) throws IOException {
        return new byte[0];
    }

    @Override
    public String updateImageInFileSystem(Long id, MultipartFile newFile) throws IOException {
        return "";
    }

    @Override
    public int getTotalImageInFileSystem() {
        return 0;
    }

    @Override
    public List<String> getDuplicatedImageInFileSystem() {
        return List.of();
    }
}
