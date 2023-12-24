
import { Link } from "react-router-dom"

const Navbar = ({ search, setSearch }) => {
    return(
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="text"
                    placeholder="Search Here"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/post">Post</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>

        </nav>
    )
}

export default Navbar