import Header from "./Header";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import NewPost from "./NewPost";
import DetailPost from "./DetailPost";
import Missing from "./Missing";
import Footer from "./Footer";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import { format } from 'date-fns';
import api from './api/posts'
import EditPost from "./EditPost";
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);

  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [searchPost, setSearchPost] = useState([]);

  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');

  const navigate = useNavigate();

  // useEffect(()=> {
  //   const fetchPosts = async () => {
  //     try{
  //       // axios makes it easier for us by converting the data into json unlike fetch api and handles the check for response ok as well
  //       const response = await api.get('/posts');
  //       setPosts(response.data);
  //     }
  //     catch(err){
  //       if (err.response) {
  //         // Not in the 200 response range 
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   }

  //   fetchPosts();
  // }, []);


  useEffect(()=>{
    setPosts(data);
    
  }, [data]);

  useEffect(()=> {
    const filteredPosts = posts.filter((post)=> (
      ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
      ((post.title).toLowerCase()).includes(search.toLowerCase())
    ));

    setSearchPost(filteredPosts.reverse());

  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body:postBody }
    try{
      const response = await api.post('/posts', newPost);
      setPosts([...posts,response.data]);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    }
    catch(err){
      console.log(`Error: ${err.message}`);
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const editPost = {id, title:editTitle, datetime, body:editBody};
    try{
      const response = await api.put(`/posts/${id}`, editPost);
      setPosts(posts.map((post) => post.id === id ? {...response.data} : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    }
    catch(err){
      console.log(`Error: ${err.message}`);
    }
  }
 
  const handleDelete = async (id) => {
    try{
      await api.delete(`/posts/${id}`);
      const allPosts = posts.filter((post) => post.id !== id);
      setPosts(allPosts);
      navigate('/');
    }
    catch(err){
      console.log(`Error: ${err.message}`);
    }

  } 

  return (
    <div className="App">
      <Header title="React App"/>

      <Navbar 
        search={search}
        setSearch={setSearch}
      />

      <Routes>
        <Route 
          exact path="/" 
          element={
            <Home 
              posts={searchPost}
              fetchError={fetchError}
              isLoading={isLoading}
            />
          } 
        />

        <Route 
          path="/post" 
          element={
            <NewPost 
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleSubmit={handleSubmit}
            />
          }
        />

        <Route 
          path="/edit/:id" 
          element={
            <EditPost 
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
            />
          }
        />

        <Route 
          path="/post/:id" 
          element={
            <DetailPost 
              posts={posts}
              handleDelete={handleDelete}
            />
          }
        />

        <Route path="/about" element={<About />}/>

        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
