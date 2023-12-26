
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from './context/DataContext';
import api from "./api/posts";

const DetailPost = () => {

    const {posts, setPosts} = useContext(DataContext)

    const {id} = useParams();
    const post = posts.find((post) => (post.id).toString() === id);

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
          await api.delete(`/posts/${id}`);
          const allPosts = posts.filter((post) => post.id !== id);
          setPosts(allPosts);
          navigate("/");
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      };

    return(
        <main className='PostPage'>
            <article className='post'>
                {
                    post && 
                    <>
                        <h2>{post.title}</h2>
                        <p className='postDate'>{post.datetime}</p>
                        <p className='postBody'>{post.body}</p>
                        <Link to={`/edit/${post.id}`}><button className='editButton'>Edit</button></Link>
                        <button className='deleteButton' onClick={() => handleDelete(post.id)}>Delete</button>
                    </>
                }

                {
                    !post &&
                    <>
                        <h2 style={{color:"#1aacbc"}}>Oops it seems like post not found.</h2>
                        <p>Please visit to our home page.</p>
                        <Link to="/">Home</Link>
                    </>
                }

            </article>
        </main>
    )
}

export default DetailPost