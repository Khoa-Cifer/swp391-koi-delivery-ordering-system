import nodemailer from "nodemailer";
import HTML_TEMPLATE from "./htmlTemplate";

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "tdkhoa2409@gmail.com",
        pass: "dydm ksbn rbcu vudz",
    },
});

const SENDMAIL = async (mailDetails, callback) => {
    try {
        const info = await transporter.sendMail(mailDetails)
        callback(info);
    } catch (error) {
        console.log(error);
    }
};

export default SENDMAIL;

export function createEmailOptions(message) {
    return {
        from: "tdkhoa2409@gmail.com", // sender address
        to: "ulquiorracifer2409@gmail.com", // receiver email
        subject: "Send email if any error occured", 
        text: message,
        html: HTML_TEMPLATE(message),
    };
}