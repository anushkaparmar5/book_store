import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';

import Header from './BooksStore/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>


          <Route path='/' element={<Books />} />
          <Route path="/skill" element={<Skill />} />
          <Route path="/contect" element={<Contect />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/work" element={<Work />} />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
