
import {Link} from 'react-router-dom';

const Missing = () => {
    return(
        <main className="Missing">
            <h2 style={{color:"#1aacbc"}}>Oops seems like the page you are looking for is not found.</h2>
            <p>Visit back to our Home page</p>
            <Link to='/'>Home</Link>
        </main>
    )
}

export default Missing