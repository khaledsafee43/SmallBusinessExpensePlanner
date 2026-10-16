import { Routes,Route } from "react-router-dom"
import Header from "./components/header"
import Home from "./pages/Home"
function App() {
  return (
    <>
      <main>
       <Header/>
       <Routes>
        <Route path="/" element={<Home/>}/>
       </Routes>
      </main>
    </>
  )
}

export default App
