import { useState } from "react";
import emailjs from '@emailjs/browser';
import "/src/CSS/infor.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      message: formData.message
    };

    emailjs.send(
      'service_39dg99n',
      'template_5sirpyb',
      templateParams,
      'KlogL92pT2msAUOUa'
    )
      .then((response) => {
        console.log('GỬI THÀNH CÔNG!', response.status, response.text);
        alert("Cảm ơn bạn! Tin nhắn đã được gửi.");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      })
      .catch((err) => {
        console.log('GỬI THẤT BẠI...', err);
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      });
  };

  return (
    <div className="form-wrapper">
      <div className="contact-container">
        <form onSubmit={handleSubmit}>
          <h2>Contact us</h2>

          <div className="input-group">
            <label>First name</label>
            <input name="firstName" value={formData.firstName} placeholder="First name" onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Last name</label>
            <input name="lastName" value={formData.lastName} placeholder="Last name" onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Email *</label>
            <input name="email" value={formData.email} type="email" placeholder="Email" required onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Message *</label>
            <textarea name="message" value={formData.message} placeholder="Message" required onChange={handleChange} />
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;