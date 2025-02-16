import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import GeneralDashboard from './pages/Department/GeneralDashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<GeneralDashboard/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
