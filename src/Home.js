
import Feed from './Feed'
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Home = () => {

    const { searchPost, fetchError, isLoading } = useContext(DataContext)
    return(
        <main className="Home">
            {
                isLoading && <p>Loading Posts...</p>
            }
            {
                !isLoading && fetchError && <p style={{color:"red"}}>{fetchError}</p>
            }
            {
                !isLoading && !fetchError &&
                (searchPost.length ?
                <Feed posts={searchPost} /> :
                <p>No post to display.</p> )
            }            
        </main>
    )
}

export default Home