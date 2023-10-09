import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './Home';
import Header from './Components';
import ErrorPage from './Components/404Page';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import AddBook from './Admin/AddBook';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin/book/add' element={<AddBook />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
