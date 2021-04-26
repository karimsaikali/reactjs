class App extends React.Component {
    
    constructor(props){
        super(props);
        console.log("constructor");
        this.state = {
            count:0,
            data: []
        };
        
        this.zinputRef = React.createRef();
    }
    
    componentDidMount(){
        console.log("did mount");
        window.fetch("https://api.scriptrapps.io/react/mocks/data?auth_token=UzIyQTgwRjc2NjpteWRldmljZTAwODpBQ0ExOEUyMDYxRDZBQkY3NUZDNjc0ODk4QTIyODgxNw==").
        then( (response) => response.json()).
        then( (data) => this.processData(data));
    }
    
    componentDidUpdate(){
        console.log("did update");
    }
    
    componentWillUnmount() {
        console.log("will unmount");
    }
    
    processData(data){
        console.log("data ", data);
        this.setState({data:data.response.result});
    }
    
    handleClick(event){
        console.log("click");
        this.setState({count: this.state.count + 1});
    }
    
    onClickCallback(event) {
        
        console.log("this: ", this);
        console.log("zinputRef: ", this.zinputRef);
        this.zinputRef.current.focus();
    }
    
    render(){
        console.log("render");
        return (
            <div>
            	<h2 onClick={(event)=>this.handleClick(event)}>Hello</h2>
        		<Zinput ref={this.zinputRef}/>
            	<br/>
            	<table>
                    {this.state.data.map( (row) => <TableRow value={row} key={row.key}/> )}
            	</table>
                <Footer onClickCallback = {() => this.onClickCallback()}/>
        	</div>
        )
    }
}
   
class TableRow extends React.Component {
    
    constructor(props){
        super(props);
    }
    
    render(){
        
        return (
        	<React.Fragment>
            	<tr>
            	<td>{this.props.value.temperature}</td>
            	<td>{this.props.value.humdity}</td>
            	<td>{this.props.value.creationDate}</td>
                </tr>
            </React.Fragment>
        )
    }
}

const Zinput = React.forwardRef( (props, ref) => {
    
    const [val, setVal] = React.useState(0);
   
    React.useEffect(
    	() => {console.log("effect");}
    )
    
    const handleClick = (event) => {
        console.log("zinput click");
        setVal(val + 1);
    }
    
    const doZeFocus = () => {
        ref.current.focus();
    }
    
    return (
        	<div>
        		<input type="text" value={val} onClick={handleClick} ref={ref}/>
        	</div>
    );
})

function Footer(props) {
       
    return (
        <div>
        	<h4>Footer</h4>
        	<button onClick = {props.onClickCallback}>Input focus</button>
        </div>
    )
}

ReactDOM.render(
	<App/>,
    document.getElementById("root")
);