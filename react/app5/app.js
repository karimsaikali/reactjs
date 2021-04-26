class App extends React.Component {
    
    constructor(props){
        super(props);
        this.props.url = "https://jsonplaceholder.typicode.com/posts";
        this.state = {
            posts: []
        };
        
        this.loadPosts();
    }
    
    loadPosts(){
        console.log(`Loading posts from ${this.props.url}`);        
        window.fetch(this.props.url)
        .then(response => response.json())
        .then((data) => {
            	this.setState({posts: data});
            	console.log("data: ", data);
        	}
         ).catch( error => console.log(error));     
    }
    
   render(){
       console.log("posts: ", this.state.posts)
       return (
       	<table>
           {this.state.posts.length == 0 ? "Loading..." : this.state.posts.map( (prop) => <Post title={prop.title} body={prop.body}/>)}
       	</table>
       )
   }
}

class Post extends React.Component {
    
    constructor(props){
        super(props);
    }
    
    render(){
        console.log("Post rendering...");
        return (
            <div>
                <tr>
                    <td>
                        <b>{this.props.title}</b>
                    </td>
                </tr>
                <tr>
                    <td>
                        {this.props.body}
                    </td>
                </tr>
            </div>
        );
    }
}

ReactDOM.render(
	<App/>,
    document.getElementById("root")
);