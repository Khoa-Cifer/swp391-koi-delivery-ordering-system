package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.File;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;

public interface IFileService {
    public File uploadFileToFileSystem(MultipartFile file) throws IOException;
    public byte[] getFileFromFileSystem(Long id) throws IOException;
    public String updateFileInFileSystem(Long id, MultipartFile newFile) throws IOException;
    public int getTotalFileInFileSystem();
    public List<String> getDuplicatedFileInFileSystem();

}
