import Header from "./Header";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import DetailPost from "./DetailPost";
import Missing from "./Missing";
import Footer from "./Footer";
import { DataProvider } from "./context/DataContext";
import { Routes, Route } from "react-router-dom";


function App() {
 
  return (
    <div className="App">
      <Header title="React App" />
      <DataProvider>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home/>} />

          <Route path="/post" element={<NewPost/>} />

          <Route path="/edit/:id" element={<EditPost />} />

          <Route path="/post/:id" element={<DetailPost />} />

          <Route path="/about" element={<About />} />

          <Route path="*" element={<Missing />} />
        </Routes>
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;
