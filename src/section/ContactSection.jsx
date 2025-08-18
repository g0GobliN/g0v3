import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";

const ContactSection = ({
  formData,
  handleInputChange,
  handleSubmit,
  isDarkMode,
  emailCopied,
  copyEmail,
  submitStatus,
}) => (
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

      <ContactForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isDarkMode={isDarkMode}
        submitStatus={submitStatus}
      />

      <ContactInfo
        isDarkMode={isDarkMode}
        emailCopied={emailCopied}
        copyEmail={copyEmail}
      />
    </div>
  </div>
);

export default ContactSection;
