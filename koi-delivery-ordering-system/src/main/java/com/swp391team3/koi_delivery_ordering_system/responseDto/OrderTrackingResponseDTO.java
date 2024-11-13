package com.swp391team3.koi_delivery_ordering_system.responseDto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class OrderTrackingResponseDTO {
    private String trackingId;
    private String nameSender;
    private String nameReceiver;
    private int orderStatus;
    private Date createdDate;
    private Date finishDate;
    private Date expectedFinishDate;
    private String staffType;
    private Long staffId;
    private String staffName;
    private String staffNumber;
    private String proccessType;
    private String orderLocation;
}
