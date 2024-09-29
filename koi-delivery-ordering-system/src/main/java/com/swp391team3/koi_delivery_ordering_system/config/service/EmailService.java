package com.swp391team3.koi_delivery_ordering_system.config.service;

import com.swp391team3.koi_delivery_ordering_system.model.*;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    @Autowired
    TemplateEngine templateEngine;
    @Autowired
    JavaMailSender javaMailSender;

    public void sendEmail(EmailDetail emailDetail) {
        try {
            Context context = new Context();
            if(emailDetail.getReceiver() instanceof Customer){
                context.setVariable("name", ((Customer) emailDetail.getReceiver()).getEmail());
            } else if(emailDetail.getReceiver() instanceof DeliveryStaff){
                context.setVariable("name", ((DeliveryStaff) emailDetail.getReceiver()).getEmail());
            } else if(emailDetail.getReceiver() instanceof Manager){
                context.setVariable("name", ((Manager) emailDetail.getReceiver()).getEmail());
            } else if (emailDetail.getReceiver() instanceof SalesStaff) {
                context.setVariable("name", ((SalesStaff) emailDetail.getReceiver()).getEmail());
            } else {
                throw new IllegalArgumentException("Unknown user type");
            }
            context.setVariable("button", "Go to home page");
            context.setVariable("link", emailDetail.getLink());

            String template = templateEngine.process("welcome-template", context);

            //Creating a simple mail message
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

            //Setting up necessary details
            mimeMessageHelper.setFrom("koideliveringsystem.swp.fpt@gmail.com");
            if(emailDetail.getReceiver() instanceof Customer){
                mimeMessageHelper.setTo(((Customer) emailDetail.getReceiver()).getEmail());
            } else if(emailDetail.getReceiver() instanceof DeliveryStaff){
                mimeMessageHelper.setTo(((DeliveryStaff) emailDetail.getReceiver()).getEmail());
            } else if(emailDetail.getReceiver() instanceof Manager){
                mimeMessageHelper.setTo(((Manager) emailDetail.getReceiver()).getEmail());
            } else if (emailDetail.getReceiver() instanceof SalesStaff) {
                mimeMessageHelper.setTo(((SalesStaff) emailDetail.getReceiver()).getEmail());
            } else {
                throw new IllegalArgumentException("Unknown user type");
            }
            mimeMessageHelper.setText(template, true);
            mimeMessageHelper.setSubject(emailDetail.getSubject());

            //send email
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.out.println("ERROR SENT EMAIL!");
        }
    }


}
