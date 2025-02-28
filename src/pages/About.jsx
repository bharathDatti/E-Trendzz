import { useState } from 'react';

const About = () => {
  // State to track which accordion (FAQ) is active
  const [activeAccordion, setActiveAccordion] = useState(null);

  // List of FAQs with questions and answers
  const faqs = [
    {
      question: 'What is EShop?',
      answer: 'EShop is your one-stop destination for all your shopping needs. We offer a wide range of products across multiple categories, ensuring quality and competitive prices.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order is confirmed, you can track it through your account dashboard. We provide regular updates on your order status via email and SMS.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be in their original condition with tags attached. Some restrictions apply to certain categories.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can check shipping rates during checkout.'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg- rounded-lg shadow-md p-8">
          {/* Title section */}
          <h1 className="text-3xl font-bold mb-8">About E-Trendzz</h1>
          
          {/* Our Story section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700">
              Founded in 2025, E-Trendzz has grown from a small online store to one of the leading
              e-commerce platforms. Our mission is to provide customers with high-quality products
              at competitive prices while ensuring an exceptional shopping experience.
            </p>
          </div>

          {/* Our Values section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Individual Value Cards */}
              <div className="p-4 border border-gray-950 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p className="text-gray-700">
                  We ensure all products meet our high standards of quality.
                </p>
              </div>
              <div className="p-4 border border-gray-950 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Customer First</h3>
                <p className="text-gray-600">
                  Your satisfaction is our top priority.
                </p>
              </div>
              <div className="p-4 border border-gray-950 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We continuously improve our services and offerings.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-950 rounded-lg">
                  {/* FAQ Question as a Button */}
                  <button
                    className="w-full px-4 py-3 text-left font-semibold flex justify-between items-center"
                    onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                  >
                    {faq.question}
                    {/* Icon for expanding/collapsing the answer */}
                    <span className={`transform transition-transform ${
                      activeAccordion === index ? 'rotate-180' : ''
                    }`}>
                      ▼
                    </span>
                  </button>
                  {/* FAQ Answer (Shown only if the question is active) */}
                  {activeAccordion === index && (
                    <div className="px-4 py-3 border-t">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
