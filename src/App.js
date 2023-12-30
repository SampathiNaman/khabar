import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import RenderNews from './components/RenderNews';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>        
        <Route path='/*' element={<Home />} >
        (<Route path=':id' element={<RenderNews  />} />) 
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
