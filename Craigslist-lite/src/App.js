import { useState, useEffect } from "react"
import Posts from "./Posts"




const App = () => {
    const [posts, setPosts] = useState([]);
    return(
        <Posts 
            posts={posts}
            setPosts={setPosts}
        />
    )
}

export default App