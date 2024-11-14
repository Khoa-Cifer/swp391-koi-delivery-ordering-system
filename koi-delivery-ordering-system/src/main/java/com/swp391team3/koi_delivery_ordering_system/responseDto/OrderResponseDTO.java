package com.swp391team3.koi_delivery_ordering_system.responseDto;

import com.swp391team3.koi_delivery_ordering_system.model.Fish;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class OrderResponseDTO {
    private String trackingId;
    private String name;
    private Date createdDate;
    private Date expectedFinishDate;
    private Date finishDate;
    private String senderAddress;
    private String destinationAddress;
    private double price;
    private int orderStatus;
    private String cancelReason;
    private String receiverPhone;
    private Set<Fish> fishes;
}
