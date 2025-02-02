import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetupOrganisation = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPage, setSelectedPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);

  // Dummy data with chunks
  const [scrapingProgress, setScrapingProgress] = useState([
    {
      url: "https://example.com/home",
      status: "Scraped",
      chunks: [
        "Welcome to our innovative solutions",
        "We help businesses transform digitally",
        "Our AI-powered platform delivers results",
        "24/7 customer support available",
      ],
    },
    {
      url: "https://example.com/about",
      status: "Scraped",
      chunks: [
        "Founded in 2020 by industry experts",
        "Team of 50+ AI specialists",
        "Global presence in 10 countries",
        "Award-winning technology solutions",
      ],
    },
    {
      url: "https://example.com/services",
      status: "Pending",
      chunks: [],
    },
    {
      url: "https://example.com/contact",
      status: "Failed",
      chunks: [],
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log({ companyName, websiteUrl, description });
      // After successful submission, you might want to start the scraping process
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMetaDescription = async () => {
    if (!websiteUrl) return;

    setIsFetchingMeta(true);
    try {
      // Simulate API call to fetch meta description
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setDescription(
        "Leading provider of AI-powered chatbot solutions for businesses. We help companies automate customer support and enhance user engagement through innovative technology."
      );
    } catch (error) {
      console.error("Error fetching meta description:", error);
    } finally {
      setIsFetchingMeta(false);
    }
  };

  const handleContinue = () => {
    navigate("/integration"); // Navigate to the next step
  };

  console.log(companyName);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
          Setup Your Organisation
        </h2>
        <p className="mt-4 text-center text-lg text-gray-600 sm:text-xl lg:text-2xl">
          Tell us about your company to get started.
        </p>
      </div>

      <div className="mt-8 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="companyName"
                className="block text-lg font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 text-black outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="websiteUrl"
                className="block text-lg font-medium text-gray-700"
              >
                Website URL
              </label>
              <div className="mt-1  ">
                <input
                  type="url"
                  id="websiteUrl"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="flex-1 block rounded-md w-full border border-gray-300 rounded-l-md shadow-sm py-3 px-4 outline-none text-black"
                  required
                />
                <button
                  type="button"
                  onClick={fetchMetaDescription}
                  disabled={isFetchingMeta || !websiteUrl}
                  className="inline-flex mt-2 items-center px-4 py-2  rounded-r-md bg-gray-50 text-sm font-medium  hover:bg-gray-100  disabled:opacity-50"
                >
                  {isFetchingMeta ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2  mr-2"></div>
                      Fetching...
                    </div>
                  ) : (
                    "Fetch Meta"
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-lg font-medium text-gray-700"
              >
                Company Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 text-black outline-none"
                rows="6"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isLoading}
                className="flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  "Save Organization Details"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-medium text-gray-900">
                Website Scraping Progress
              </h2>
              <button
                onClick={handleContinue}
                className="outline-none font-medium ml-4"
                // disabled={}
              >
                Next Step →
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {scrapingProgress.map((page, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setSelectedPage(selectedPage === page ? null : page)
                  }
                  className="cursor-pointer"
                >
                  <div
                    className={`p-4 border-l-4 ${
                      page.status === "Scraped"
                        ? "border-green-500 bg-green-50"
                        : page.status === "Pending"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-red-500 bg-red-50"
                    } rounded-md`}
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-medium text-gray-700">
                        {page.url}
                      </p>
                      <span
                        className={`px-2 py-1 text-sm rounded-full ${
                          page.status === "Scraped"
                            ? "bg-green-100 text-green-800"
                            : page.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {page.status}
                      </span>
                    </div>

                    {selectedPage === page && page.chunks.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Scraped Content:
                        </p>
                        {page.chunks.map((chunk, i) => (
                          <div
                            key={i}
                            className="p-3 bg-white rounded border border-gray-200 text-sm text-gray-600"
                          >
                            {chunk}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupOrganisation;
