import './lib/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import YläHistoria from './Ylähistoria';
import AlaHistoria from './Alahistoria';
import Järvihistoria from './Järvihistoria';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Ylähistoria" element={<YläHistoria />} />
        <Route path="/Alahistoria" element={<AlaHistoria />} />
        <Route path="/Järvihistoria" element={<Järvihistoria />} />
      </Routes>
    </Router>
  );
}
export default App;
