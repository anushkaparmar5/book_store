import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './Home';
import ErrorPage from './Components/404Page';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import AddBook from './Admin/AddBook';
import Header from './Components/Header';
import ViewBook from './ViewBookDetails/ViewBook';
import Books from './Admin/Books';
import Cart from './Cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/admin/book/add' element={<AddBook />} />
          <Route path='/admin/books' element={<Books />} />
          <Route path='book-details/:id' element={<ViewBook />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
