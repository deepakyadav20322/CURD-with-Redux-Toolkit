
import './App.css';
import Navbar from './component/Navbar'
import Create from './component/Create'
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Read from './component/Read';
import Update from './component/Update';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Create />} />
          <Route  path="/read" element={<Read />} />
          <Route exact path="/edit/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
