import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchPost, setSearchPost] = useState([]);

  
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );


  // getting response manually withot custom hooks
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

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchPost(filteredPosts.reverse());
  }, [posts, search]);

  

  

  

  return (
    <DataContext.Provider value={{
        search, setSearch,
        searchPost, fetchError, isLoading,
        posts, setPosts
    }}>
        {children}
    </DataContext.Provider>
  )
};

export default DataContext
