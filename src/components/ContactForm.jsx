import { useState } from "react";

const ContactForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  isDarkMode,
  submitStatus,
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !formData.email.includes("@"))
      newErrors.email = "Valid email required";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    handleSubmit(e);
  };

  return (
    <div className="space-y-4 max-w-md">
      <div onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          name="name"
          placeholder="your name"
          value={formData.name}
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()}
          className={`w-full bg-transparent border-b text-xs py-2 focus:outline-none transition-all duration-200 ${
            isDarkMode
              ? "border-gray-700 focus:border-cyan-400 text-white placeholder-gray-500"
              : "border-gray-200 focus:border-gray-400 text-black placeholder-gray-500"
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        <input
          type="email"
          name="email"
          placeholder="your email"
          value={formData.email}
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()}
          className={`w-full bg-transparent border-b text-xs py-2 focus:outline-none transition-all duration-200 ${
            isDarkMode
              ? "border-gray-700 focus:border-cyan-400 text-white placeholder-gray-500"
              : "border-gray-200 focus:border-gray-400 text-black placeholder-gray-500"
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        <textarea
          name="message"
          placeholder="tell me about your project..."
          value={formData.message}
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()}
          rows={4}
          className={`w-full bg-transparent border-b text-xs py-2 focus:outline-none resize-none transition-all duration-200 ${
            isDarkMode
              ? "border-gray-700 focus:border-cyan-400 text-white placeholder-gray-500"
              : "border-gray-200 focus:border-gray-400 text-black placeholder-gray-500"
          }`}
        />
        {errors.message && (
          <p className="text-red-500 text-xs">{errors.message}</p>
        )}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSubmit(e);
        }}
        className={`relative text-xs font-medium underline px-2 py-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-transform duration-200 hover:-translate-y-1 active:translate-y-0 active:scale-95 active:shadow-md`}
      >
        send message
      </button>

      {submitStatus === "success" && (
        <p className="text-green-400 text-xs mt-1">
          Message sent successfully!
        </p>
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
