import { useState } from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";

const CopyButton = () => {
  const [copyStatus, setCopyStatus] = useState("Copy to clipboard");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        '<script src="https://beyondchats.com/widget.js"></script>'
      );
      setCopyStatus("Copied!");
      setTimeout(() => {
        setCopyStatus("Copy to clipboard");
      }, 2000);
    } catch (err) {
      setCopyStatus("Failed to copy");
      console.error("Failed to copy: ", err);
      setTimeout(() => {
        setCopyStatus("Copy to clipboard");
      }, 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`mt-2 px-3 py-1 rounded text-sm transition-colors duration-200 ${
        copyStatus === "Copied!"
          ? "bg-green-100 text-green-800"
          : copyStatus === "Failed to copy"
          ? "bg-red-100 text-red-800"
          : "text-white"
      }`}
    >
      {copyStatus === "Copied!" && <span className="inline-block mr-1">✓</span>}
      {copyStatus === "Failed to copy" && (
        <span className="inline-block mr-1">✗</span>
      )}
      {copyStatus}
    </button>
  );
};

const ChatbotIntegration = () => {
  const [integrationStatus, setIntegrationStatus] = useState(null); // 'success' | 'pending' | 'failed' | null
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [showIntegrationSteps, setShowIntegrationSteps] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleTestChatbot = () => {
    // Open a new window with the test chatbot
    const testWindow = window.open("", "_blank");
    testWindow.document.write(`
      <html>
        <head>
          <title>Chatbot Test</title>
          <style>
            .feedback-bar {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              background: #4B5563;
              color: white;
              padding: 12px;
              text-align: center;
              cursor: pointer;
            }
            .chatbot-widget {
              position: fixed;
              bottom: 20px;
              right: 20px;
              width: 60px;
              height: 60px;
              background: #3B82F6;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
          </style>
        </head>
        <body>
          <div class="feedback-bar">
            Chatbot not working as intended? Share feedback
          </div>
          <div class="chatbot-widget">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
          <h1 style="text-align: center; margin-top: 40px;">Your Website with Chatbot Integration</h1>
        </body>
      </html>
    `);
  };

  const handleIntegrate = () => {
    setShowIntegrationSteps(true);
  };

  const handleEmailDeveloper = (e) => {
    e.preventDefault();
    // Simulate sending email
    alert(`Instructions sent to ${email}`);
    setShowEmailForm(false);
    setEmail("");
  };

  const handleTestIntegration = () => {
    setIntegrationStatus("pending");

    setTimeout(() => {
      const isSuccessful = Math.random() > 0.5;
      if (isSuccessful) {
        setIntegrationStatus("success");
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 2000);
      } else {
        setIntegrationStatus("failed");
      }
    }, 2000);
  };

  const IntegrationSteps = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 className="text-xl font-bold mb-4">Integration Instructions</h3>
          <div className="bg-gray-50 p-4 rounded mb-4 text-black">
            <code className="text-sm">
              {'<script src="https://beyondchats.com/widget.js"></script>'}
            </code>
            <br />
            <CopyButton />
          </div>
          <div className="space-y-4">
            <button
              onClick={() => setShowEmailForm(true)}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Email to Developer
            </button>
            <button
              onClick={() => setShowIntegrationSteps(false)}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {showConfetti && <Confetti />}

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
          Chatbot Integration & Testing
        </h2>
        <p className="mt-4 text-center text-lg text-gray-600 sm:text-xl lg:text-2xl">
          Test and integrate your chatbot seamlessly.
        </p>
      </div>

      <div className="mt-8 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10">
          {integrationStatus === null && (
            <div className="space-y-6">
              <button
                onClick={handleTestChatbot}
                className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Test Chatbot
              </button>

              <button
                onClick={handleIntegrate}
                className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Integrate on Your Website
              </button>

              <button
                onClick={handleTestIntegration}
                className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Test Integration
              </button>
            </div>
          )}

          {integrationStatus === "pending" && (
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-lg text-gray-600">
                Checking integration status...
              </p>
              <p className="text-sm text-gray-500">
                This might take a few moments
              </p>
            </div>
          )}

          {integrationStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-green-600">
                Integration Successful!
              </h2>
              <div className="space-y-4">
                <button className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Explore Admin Panel
                </button>
                <button className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Start Talking to Your Chatbot
                </button>
              </div>
              <div className="flex justify-center space-x-4 pt-4">
                <button className="px-4 py-2 bg-[#1DA1F2] text-white rounded-md hover:bg-[#1a8cd8]">
                  Share on Twitter
                </button>
                <button className="px-4 py-2 bg-[#4267B2] text-white rounded-md hover:bg-[#365899]">
                  Share on Facebook
                </button>
              </div>
            </motion.div>
          )}

          {integrationStatus === "failed" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-red-600">
                Integration Not Detected
              </h2>
              <p className="text-gray-600">
                We couldn&apos;t detect the chatbot integration on your website.
                This could be because:
              </p>
              <ul className="text-left text-gray-600 list-disc pl-6">
                <li>
                  The code snippet hasn&apos;t been added to your website yet
                </li>
                <li>The changes haven&apos;t been published</li>
                <li>There might be a conflict with other scripts</li>
              </ul>

              <div className="space-y-4 mt-6">
                <button
                  onClick={() => setShowIntegrationSteps(true)}
                  className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  View Integration Instructions Again
                </button>

                <button
                  onClick={() => setShowEmailForm(true)}
                  className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Contact Developer
                </button>

                <button
                  onClick={() =>
                    window.open(
                      "https://docs.beyondchats.com/troubleshooting",
                      "_blank"
                    )
                  }
                  className="w-full flex justify-center py-3 px-6 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  View Troubleshooting Guide
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 mb-4">
                  Need help with the integration?
                </p>
                <button
                  onClick={() => window.open("mailto:support@beyondchats.com")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Contact Support →
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Integration Steps Modal */}
      <AnimatePresence>
        {showIntegrationSteps && <IntegrationSteps />}
      </AnimatePresence>

      {/* Email Developer Form */}
      <AnimatePresence>
        {showEmailForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Email to Developer</h3>
              <form onSubmit={handleEmailDeveloper} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Developer's email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotIntegration;
