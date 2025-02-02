import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SetupOrganisation from "./SetupOrganisation";
import ChatbotIntegration from "./ChatbotIntegration";
import UserRegistration from "./UserRegistration";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserRegistration />} />
          <Route path="/setup" element={<SetupOrganisation />} />
          <Route path="/integration" element={<ChatbotIntegration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
