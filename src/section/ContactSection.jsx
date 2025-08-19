import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";

const ContactSection = ({ formData, handleInputChange, isDarkMode, emailCopied, copyEmail }) => {
  return (
    <div
      className="pl-8 pb-8"
      style={{ opacity: 0, animation: "slideIn 0.6s ease-out forwards" }}
    >
      <div className="space-y-6">
        <div
          className={`text-xs leading-relaxed ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          let's talk about your project
        </div>

        {/* Contact Form */}
        <ContactForm
          formData={formData}
          handleInputChange={handleInputChange}
          isDarkMode={isDarkMode}
        />

        {/* Contact Info */}
        <ContactInfo
          isDarkMode={isDarkMode}
          emailCopied={emailCopied}
          copyEmail={copyEmail}
        />
      </div>
    </div>
  );
};

export default ContactSection;
