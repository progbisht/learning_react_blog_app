
const About = () => {
    return(
        <main className="About">
            <h2>About Us</h2>
            <p style={{marginTop:"1rem"}}> This App is developed using React and it is a part of learning React JS.</p>
            <p style={{marginTop:"0.5rem"}}>
                This App is implemented utilizing the following topics and concepts:
                <ul style={{marginTop:"0.5rem", marginLeft:"2rem"}}>
                    <li>Components</li>
                    <li>Props and Props Drilling</li>
                    <li>Events</li>
                    <li>React Hooks such as useState, useEffect, useParams, useNavigate, useContext, useRef etc.</li>
                    <li>Fetch API and CRUD Operations</li>
                    <li>Ease of using axios over fetch API</li>
                    <li>React Router</li>
                    <li>Custom Hooks</li>
                </ul>
            </p>
        </main>
    )
}

export default About