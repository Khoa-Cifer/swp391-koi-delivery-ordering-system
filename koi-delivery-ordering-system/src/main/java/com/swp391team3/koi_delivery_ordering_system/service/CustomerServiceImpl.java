package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.config.thirdParty.EmailService;
import com.swp391team3.koi_delivery_ordering_system.model.Customer;
import com.swp391team3.koi_delivery_ordering_system.requestDto.CustomerRequestUpdateDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.EmailDetailDTO;
import com.swp391team3.koi_delivery_ordering_system.repository.CustomerRepository;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserRequestRegisterDTO;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements ICustomerService {
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Override
    public String customerRegister(String email, String password, String username, String phoneNumber) {
        Customer newCustomer = new Customer();
        newCustomer.setEmail(email);

        boolean emailDuplicatedCheck = customerRepository.existsByEmail(email);
        if (emailDuplicatedCheck) {
            return "This email already exists";
        }

        String encodedPassword = passwordEncoder.encode(password);
        newCustomer.setPassword(encodedPassword);

        newCustomer.setUsername(username);
        newCustomer.setPhoneNumber(phoneNumber);

        customerRepository.save(newCustomer);

//        mail sending
        EmailDetailDTO emailDetail = new EmailDetailDTO();
        emailDetail.setReceiver((Object) newCustomer);
        emailDetail.setSubject("Welcome to KOI DELIVERY SYSTEM! We're glad you're here");
        emailDetail.setLink("http://localhost:8080/swagger-ui/index.html");
        emailService.sendEmail(emailDetail);

        return "Register successfully";
    }

    @Override
    public boolean customerLogin(String email, String password) {
        Customer matchedCustomer = getCustomerByEmail(email);
        if (matchedCustomer != null) {
            if (passwordEncoder.matches(password, matchedCustomer.getPassword())) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    @Override
    public Customer getCustomerByEmail(String email) {
        return customerRepository.findCustomerByEmail(email);
    }

    @Override
    public List<Customer> getAllCustomer() {
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);    
    }

    @Override
    public Customer updateCustomerById(Long id, String email, String phoneNumber) {
        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            customer.setEmail(email);
            customer.setPhoneNumber(phoneNumber);
            return customerRepository.save(customer);
        } else {
            return null;
        }
    }

    @Override
    public void deleteCustomerById(Long id) {
        customerRepository.deleteById(id);    
    }

    @Override
    public String customerUpdateProfile(CustomerRequestUpdateDTO request) {
        Optional<Customer> optionalCustomer = customerRepository.findById(request.getId());

        Customer customerCheck = customerRepository.findCustomerByEmail(request.getEmail());
        if (customerCheck != null) {
            if ((!Objects.equals(customerCheck.getId(), optionalCustomer.get().getId()))
                    && (Objects.equals(customerCheck.getEmail(), optionalCustomer.get().getEmail()))) {
                return "This email already exist";
            }
        }

        Customer customer = optionalCustomer.get();
        if (!request.getPassword().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(request.getPassword());
            customer.setPassword(encodedPassword);
        }

        customer.setEmail(request.getEmail());
        customer.setPhoneNumber(request.getPhoneNumber());
        customerRepository.save(customer);
        return "Update Info Successfully";
    }
}
