
const App = () => {
    
    const [posts, setPosts] = React.useState([]);
    React.useEffect(
    	()=>{
            console.log("posts: ", posts);
            if (posts.length == 0){
                loadPosts();
            }
            return function(){console.log("cleanup after effect ");} // the function passed to useEffect can return a function that is called automatically
        },[posts]
    
    )
    
    const loadPosts = ()=> {
        console.log("loading post...");
        window.fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(data => setPosts(data))
    }
    
    return (
       <div>
           <table>
              { posts.map( (post) => <Post title={post.title} body={post.body} key={post.id}/>) }
           </table>
       </div>
    )
}

const Post = (props) => {
    
    return (
        <div>
        	<tr>
        		<td><b>{props.title}</b></td>
        	</tr>
        	<tr>
        		<td>{props.body}</td>
        	</tr>
        </div>
    );
}

ReactDOM.render(
	<App/>,
    document.getElementById("root")
);