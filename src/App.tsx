import './App.css';
import Main from './components/Page/Main/Main';
import { Routes, Route } from "react-router-dom";
import SPA from './components/Page/SAP/SPA';
import Layoutstyle from './components/Page/Layout&style/Layoutstyle';


function App() {
  
  return (
    <>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/SPA" element={<SPA />} />
        <Route path="/LA" element={<Layoutstyle />} />
        

      </Routes>
    </>
  );
}

export default App;
