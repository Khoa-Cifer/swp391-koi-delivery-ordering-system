package com.swp391team3.koi_delivery_ordering_system.config.security;

import com.swp391team3.koi_delivery_ordering_system.model.Customer;
import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;
import com.swp391team3.koi_delivery_ordering_system.model.Manager;
import com.swp391team3.koi_delivery_ordering_system.model.SalesStaff;
import com.swp391team3.koi_delivery_ordering_system.repository.CustomerRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.DeliveryStaffRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.ManagerRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.SalesStaffRepository;
import com.swp391team3.koi_delivery_ordering_system.responseDto.UserResponseLoginDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class TokenService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private DeliveryStaffRepository deliveryStaffRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private SalesStaffRepository salesStaffRepository;

    @Value("${jwt.secret.key}")
    private String SECRET_KEY;

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Object user) {
        String userId = null;
        String username = null;
        String email = null;
        String roleName = null;
        String phoneNumber = null;

        UserResponseLoginDTO responseLoginUser = new UserResponseLoginDTO();

        if (user instanceof Customer) {
            Customer customer = (Customer) user;

            userId = "C_" + customer.getId();
            username = customer.getUsername();
            email = customer.getEmail();
            roleName = customer.getAuthorities().toString();
            phoneNumber = customer.getPhoneNumber();
            int roleId = 1;

            responseLoginUser.setUsername(username);
            responseLoginUser.setEmail(email);
            responseLoginUser.setPhoneNumber(phoneNumber);
            responseLoginUser.setUserRoleName(roleName);
            responseLoginUser.setRoleId(roleId);
        } else if (user instanceof DeliveryStaff) {
            userId = "D_" + ((DeliveryStaff) user).getId();
        } else if (user instanceof Manager) {
            userId = "M_" + ((Manager) user).getId();
        } else if (user instanceof SalesStaff) {
            userId = "S_" + ((SalesStaff) user).getId();
        }

        if (userId == null) {
            throw new IllegalArgumentException("Unknown user type");
        }

        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hours expiry
                .signWith(getSigningKey())
                .claim("userData", responseLoginUser)
                .compact();
    }

    public Object getUserByToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        String subject = claims.getSubject();
        String prefix = subject.substring(0, 2);
        Long id = Long.parseLong(subject.substring(2));

        switch (prefix) {
            case "C_":
                return customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
            case "D_":
                return deliveryStaffRepository.findById(id).orElseThrow(() -> new RuntimeException("Delivery Staff not found"));
            case "M_":
                return managerRepository.findById(id).orElseThrow(() -> new RuntimeException("Manager not found"));
            case "S_":
                return salesStaffRepository.findById(id).orElseThrow(() -> new RuntimeException("Sales Staff not found"));
            default:
                throw new IllegalArgumentException("Unknown user type");
        }
    }
}