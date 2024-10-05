package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.Transaction;

import java.util.Date;
import java.util.List;

public interface ITransactionService {
    public boolean createTransaction(Long customerId, Date createdDate, double amount);
    public List<Transaction> getAllTransactionsHistory();
    public List<Transaction> getTransactionsByCustomerId();
}
