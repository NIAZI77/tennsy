import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { toMail, conurl } = req.body;
    if (!toMail || !conurl) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: `Tennsy <${process.env.NEXT_PUBLIC_EMAIL_USERNAME}>`,
      to: toMail,
      subject: "Confirm Order",
      html: `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Track Your Order</title> </head> <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 20px;"> <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 40px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);"> <h2 style="color: #333;">Track Your Order</h2> <p style="color: #666;">Thank you for your order. To confirm your purchase, please click the button below:</p> <a href=${conurl}style="display: inline-block; margin: 20px auto; padding: 15px 30px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px; border: none; cursor: pointer; transition: background-color 0.3s;">Track</a> </div> </body> </html>`,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: "Failed to send email" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
