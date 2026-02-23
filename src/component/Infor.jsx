import { useState } from "react";
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
    console.log(formData);
  };

  return (
    <div className="form-wrapper">
      <div className="contact-container">
        <form onSubmit={handleSubmit}>
          <h2>Contact us</h2>

          <div className="input-group">
            <label>First name</label>
            <input name="firstName" placeholder="First name" onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Last name</label>
            <input name="lastName" placeholder="Last name" onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Email *</label>
            <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Message *</label>
            <textarea name="message" placeholder="Message" required onChange={handleChange} />
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;