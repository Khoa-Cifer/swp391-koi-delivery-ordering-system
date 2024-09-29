package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.File;
import com.swp391team3.koi_delivery_ordering_system.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements IFileService {
    private final FileRepository fileRepository;
    @Value("${file.upload-dir}")
    private String folderPath;

    @Override
    public File uploadFileToFileSystem(MultipartFile file) throws IOException {
        String filePath = folderPath + file.getOriginalFilename();
        File fileData = getFile(file, filePath);

        fileRepository.save(fileData);

        if (fileData.getVersionCopy() == 0) {
            file.transferTo(new java.io.File(folderPath + file.getOriginalFilename()));
        } else {
            file.transferTo(new java.io.File(folderPath + file.getOriginalFilename().substring(0, file.getOriginalFilename().lastIndexOf('.'))
                    + " " + "(" + fileData.getVersionCopy() + ")" + file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.'))));
        }

        return fileData;
    }

    private File getFile(MultipartFile file, String filePath) {
        Date currentDate = new Date();
        File fileData = new File();
        int versionCopy = 0;
        for (int i = 0; i < getTotalFileInFileSystem(); i++) {
            if (file.getOriginalFilename().equalsIgnoreCase(fileRepository.getDuplicateImageName().get(i))) {
                versionCopy++;
            }
        }

        fileData.setName(file.getOriginalFilename());
        fileData.setCreatedTime(currentDate);
        fileData.setType(file.getContentType());
        fileData.setFilePath(filePath);
        fileData.setVersionCopy(versionCopy);
        return fileData;
    }

    @Override
    public byte[] getFileFromFileSystem(Long id) throws IOException {
        Optional<File> fileData = fileRepository.findById(id);
        String filePath = fileData.get().getFilePath();
        byte[] images = Files.readAllBytes(new java.io.File(filePath).toPath());
        return images;
    }

    @Override
    public String updateFileInFileSystem(Long id, MultipartFile newFile) throws IOException {
        Optional<File> fileData = fileRepository.findById(id);
        String filePath = folderPath + newFile.getOriginalFilename();

        File file = fileData.get();
        file.setName(newFile.getOriginalFilename());
        file.setType(newFile.getContentType());
        file.setFilePath(filePath);

        newFile.transferTo(new java.io.File(folderPath + file.getId() + "_" + newFile.getOriginalFilename()));
        fileRepository.save(file);

        if (file != null) {
            return "file modified successfully : " + filePath;
        }
        return "Unexpected error occurred";
    }

    @Override
    public int getTotalFileInFileSystem() {
        return fileRepository.getTotalImages();
    }

    @Override
    public List<String> getDuplicatedFileInFileSystem() {
        return fileRepository.getDuplicateImageName();
    }
}
