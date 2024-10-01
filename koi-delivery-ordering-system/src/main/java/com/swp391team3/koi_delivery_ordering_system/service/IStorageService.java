package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.Storage;
import com.swp391team3.koi_delivery_ordering_system.requestDto.StorageRequestCreationDTO;

import java.util.List;

public interface IStorageService {
    public Storage createStorage(StorageRequestCreationDTO request);
    public Storage updateStorage(StorageRequestCreationDTO request, Long storageId);
    public boolean deleteStorage(StorageRequestCreationDTO request);
    public List<Storage> getALlStorages();
}
