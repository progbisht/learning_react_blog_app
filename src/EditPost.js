import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"

const EditPost = ({
    posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody
}) => {
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);

    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

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