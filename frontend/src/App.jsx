import { Routes,Route } from "react-router-dom"
import Header from "./components/header"
import Home from "./pages/Home"
import Expenses from "./pages/Expenses"
function App() {
  return (
    <>
      <main>
       <Header/>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/expenses" element={<Expenses/>}/>
       </Routes>
      </main>
    </>
  )
}

export default App
