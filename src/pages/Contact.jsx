import { useState } from "react";
import { toast } from "react-toastify"; // Importing toast for user notifications

const Contact = () => {
  // State to store form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Function to handle input changes and update state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Dynamically update state based on input field name
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    console.log("Form submitted:", formData); // Log form data for debugging

    // Display success toast notification
    toast.success("Message sent successfully!");

    // Reset form fields after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full bg-orange-100 rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2">
          
          {/* Form Section */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-purple-900 mb-6">Contact Us</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name Input Field */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email Input Field */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Subject Input Field */}
              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Message Input Field */}
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-purple-900 text-white font-semibold py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="bg-purple-900 text-white p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>

            {/* Address */}
            <p className="mb-2">
              <strong>📍 Address:</strong><br />
              123 Shopping Street, New York, NY 10001
            </p>

            {/* Email */}
            <p className="mb-2">
              <strong>📧 Email:</strong><br />
              support@etrendzz.com
            </p>

            {/* Phone */}
            <p className="mb-2">
              <strong>📞 Phone:</strong><br />
              +1 (555) 123-4567
            </p>

            {/* Business Hours */}
            <p>
              <strong>⏰ Hours:</strong><br />
              Mon - Fri: 9 AM - 6 PM<br />
              Sat: 10 AM - 4 PM<br />
              Sun: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
