import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { emailTemplet } from './emailTemplet.js';

export const sendEmails = async (email)=> {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
              user: "ag2849315@gmail.com",
              pass: "ymkqewznkajvsgsq",
            },
          });
        
        let token = jwt.sign({email},"ay7aga")

        const info = await transporter.sendMail({
              from: '"Ahmed Gamal"', // sender address
              to: email, // list of receivers
              subject: "Hello blabal", // Subject line  
              html: emailTemplet(token), // html body
              // html: emailTemplet(email), // html body
            });
        
            console.log("Message sent: %s", info.messageId);
    }
    
    


