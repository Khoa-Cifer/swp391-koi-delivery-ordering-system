package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.Storage;
import com.swp391team3.koi_delivery_ordering_system.repository.StorageRepository;
import com.swp391team3.koi_delivery_ordering_system.requestDto.StorageRequestCreationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StorageServiceImpl implements IStorageService {
    private final StorageRepository storageRepository;

    @Override
    public Storage createStorage(StorageRequestCreationDTO request) {
        Storage newStorage = new Storage();
        newStorage.setName(request.getName());
        newStorage.setAddress(request.getAddress());
        newStorage.setLongitude(request.getLongitude());
        newStorage.setLatitude(request.getLatitude());
        storageRepository.save(newStorage);
        return newStorage;
    }

    @Override
    public Storage updateStorage(StorageRequestCreationDTO request, Long storageId) {
        return null;
    }

    @Override
    public boolean deleteStorage(StorageRequestCreationDTO request) {
        return false;
    }

    @Override
    public List<Storage> getALlStorages() {
        return storageRepository.findAll();
    }
}
