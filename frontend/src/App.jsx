import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import Footer from "./components/footer";
import ExpenseManager from "./pages/EpenseManagement";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Budget from "./pages/Budget";
function App() {
  return (
    <>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/manage-Expenses" element={<ExpenseManager />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
