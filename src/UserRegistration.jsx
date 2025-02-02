import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For smooth transitions
import beyondChatLogo from "./assets/beyondchat-logo.png";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    verificationCode: "",
  });
  const [step, setStep] = useState("registration");
  const [loading, setLoading] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(0);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate brief loading state
    setTimeout(() => {
      setLoading(false);
      setStep("verification");
    }, 1000);
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      if (formData.verificationCode === "123456") {
        // Demo verification code
        setStep("success");
      }
    }, 1000);
  };

  const handleResendCode = () => {
    setResendTimeout(30);
    const timer = setInterval(() => {
      setResendTimeout((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">
              <img src={beyondChatLogo} alt="" />
            </span>{" "}
            {/* Placeholder for logo */}
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to BeyondChats
          </h2>
        </div>

        {/* Main Content */}
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-black">
          <AnimatePresence mode="wait">
            {step === "registration" && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleRegistrationSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {loading ? "Processing..." : "Register"}
                  </button>
                </div>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-6 w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <img
                      className="h-5 w-5 mr-2"
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google logo"
                    />
                    Continue with Google
                  </button>
                </div>
              </motion.form>
            )}

            {step === "verification" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Verification Code
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    We&apos;ve sent a code to {formData.email}
                  </p>
                  <p className="mt-0 text-sm text-gray-500">
                    Dummy OTP is 123456
                  </p>
                </div>

                <form onSubmit={handleVerificationSubmit} className="space-y-6">
                  <div className="flex justify-center space-x-2">
                    {[...Array(6)].map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        pattern="[0-9]"
                        inputMode="numeric"
                        className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value && index < 5) {
                            e.target.nextElementSibling?.focus();
                          }
                          const newCode = formData.verificationCode.split("");
                          newCode[index] = value;
                          setFormData({
                            ...formData,
                            verificationCode: newCode.join(""),
                          });
                        }}
                        onKeyDown={(e) => {
                          if (
                            e.key === "Backspace" &&
                            !e.target.value &&
                            index > 0
                          ) {
                            e.target.previousElementSibling?.focus();
                          }
                        }}
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || formData.verificationCode.length !== 6}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {loading ? "Verifying..." : "Verify Code"}
                  </button>
                </form>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={resendTimeout > 0}
                    className="text-sm text-white"
                  >
                    {resendTimeout > 0
                      ? `Resend code in ${resendTimeout}s`
                      : "Resend code"}
                  </button>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6"
              >
                <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Registration Successful!
                </h3>
                <p className="text-sm text-gray-500">
                  Your account has been created successfully.
                </p>
                <button
                  onClick={() => {
                    navigate("/setup");
                  }}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Continue
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
