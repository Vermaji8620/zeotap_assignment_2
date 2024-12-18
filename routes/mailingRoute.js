import nodemailer from "nodemailer";

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validateFullName = (fullname) => {
  const re = /^[a-zA-Z\s]+$/;
  return re.test(String(fullname));
};

export const mailing = async (req, res) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.nodemailer_account_holder,
        pass: process.env.NODEMAILERPASSWORD,
      },
    });
    const { fullname, email, message } = req.body;
    if (
      !fullname ||
      !email ||
      !message ||
      !validateFullName(fullname) ||
      !validateEmail(email) ||
      message.length < 10
    ) {
      return res.status(401).json({
        message: "All fields are required",
      });
    }
    const mailOptions = {
      to: process.env.email_receiving_mail_id,
      from: email,
      subject: `Your website has a form submission from - ${fullname}`,
      text: `Name: ${fullname}\nEmail: ${email}\n\nMessage:\n${message}`,
    };
    try {
      const sendingmail = await transport.sendMail(mailOptions);
      console.log(sendingmail);
      res.status(200).json({
        message: "Mail sent successfully",
        sentmail: sendingmail,
      });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Some error occured",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Some error occured" });
  }
};
