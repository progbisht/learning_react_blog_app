import { useContext, useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import DataContext from "./context/DataContext";
import { format } from "date-fns";
import api from "./api/posts";

const EditPost = () => {

    const { posts, setPosts } = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);

    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

    const handleEdit = async (id) => {
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const editPost = { id, title: editTitle, datetime, body: editBody };
        try {
          const response = await api.put(`/posts/${id}`, editPost);
          setPosts(
            posts.map((post) => (post.id === id ? { ...response.data } : post))
          );
          setEditTitle("");
          setEditBody("");
          navigate("/");
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      };

    return (
        <main className="NewPost">
            {
                editTitle && 
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e)=>e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e)=>setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Body:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e)=>setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={()=>handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }

            {
                    !editTitle &&
                    <>
                        <h2 style={{color:"#1aacbc"}}>Oops it seems like post not found.</h2>
                        <p>Please visit to our home page.</p>
                        <Link to="/">Home</Link>
                    </>
                }
            
            
        </main>
    )
}

export default EditPost