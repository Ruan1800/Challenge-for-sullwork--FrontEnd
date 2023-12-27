import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header/Header";
import AddBreakFast from "./pages/AddBreakFast/AddBreakFast";
import ListBreak from "./pages/ListBreak/ListBreak";
import EditBreak from "./pages/EditBreak/EditBreak";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ListBreak />}/>
        <Route path="/add" element={<AddBreakFast />}/>
        <Route path="/edit/:id" element={<EditBreak />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
