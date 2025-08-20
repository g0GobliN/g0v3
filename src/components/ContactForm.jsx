import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const ContactForm = ({ formData, handleInputChange, isDarkMode }) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(""); // inline message

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !formData.email.includes("@"))
      newErrors.email = "Valid email required";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/grgvishal.gurung17@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success === "true") {
        setSubmitStatus("success");
        // Clear the form
        handleInputChange({ target: { name: "name", value: "" } });
        handleInputChange({ target: { name: "email", value: "" } });
        handleInputChange({ target: { name: "message", value: "" } });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(""), 5000);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="space-y-4 max-w-md">
      {/* Name */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="your name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full bg-transparent border-b text-base scale-80 origin-left py-2 focus:outline-none transition-all duration-200 ${
            isDarkMode
              ? "border-gray-700 focus:border-cyan-400 text-white placeholder-gray-500"
              : "border-gray-200 focus:border-gray-400 text-black placeholder-gray-500"
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="your email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full bg-transparent border-b text-base scale-80 origin-left py-2 focus:outline-none transition-all duration-200 ${
            isDarkMode
              ? "border-gray-700 focus:border-cyan-400 text-white placeholder-gray-500"
              : "border-gray-200 focus:border-gray-400 text-black placeholder-gray-500"
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      {/* Message */}
      <div>
        <textarea
          name="message"
          placeholder="tell me about your project..."
          value={formData.message}
          onChange={handleInputChange}
          rows={4}
          className={`w-full bg-transparent border-b text-base scale-80 origin-left py-2 focus:outline-none resize-none transition-all duration-200 ${
            isDarkMode
              ? "border-gray-700 focus:border-cyan-400 text-white placeholder-gray-500"
              : "border-gray-200 focus:border-gray-400 text-black placeholder-gray-500"
          }`}
        />
        {errors.message && (
          <p className="text-red-500 text-xs">{errors.message}</p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className={`relative text-xs font-medium underline px-2 py-1 transition-transform duration-200 ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        } ${
          isSubmitting
            ? "opacity-50 cursor-wait"
            : "hover:-translate-y-1 active:translate-y-0 active:scale-95 active:shadow-md"
        } flex items-center gap-1`}
      >
        {isSubmitting ? (
          <>
            Sending...
            <PaperAirplaneIcon className="w-4 h-4 animate-spin" />
          </>
        ) : (
          <>
            send message
            <PaperAirplaneIcon className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Status messages */}
      {submitStatus === "success" && (
        <p className="text-green-400 text-xs mt-1">Message sent successfully!</p>
      )}
      {submitStatus === "error" && (
        <p className="text-red-500 text-xs mt-1">
          Failed to send message. Please check all fields.
        </p>
      )}
    </div>
  );
};

export default ContactForm;
