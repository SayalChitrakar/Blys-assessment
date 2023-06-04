import "./App.css";
import { Verification } from "./Pages/verification.page";
import { Success } from "./Pages/success.page.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Verification />}></Route>
          <Route path="/success" element={<Success />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
