import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Signin from './Components/Signin/Signin';
import Datepicker from './Components/Datepicker/Datepicker';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/dashboard" element={<Datepicker />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
