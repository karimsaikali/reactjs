class App extends React.Component {
       
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            data: []
        }
        
        this.searchRef = React.createRef();
    }
    
    componentDidMount(){
        console.log("app mounted");
        this.setState({loading:true});
        this.loadData();
    }
    
    componentDidUpdate(){        
        console.log("app updated");
    }
    
    componentWillUnmount(){        
    }
    
    loadData(){
        console.log("app loading data...");
        window.fetch("https://api.scriptrapps.io/react/mocks/data?auth_token=UzIyQTgwRjc2NjpiYXplbGxhOkMyRDE5RkM2REREODdBRkFFQzU5NEUzODQ1RUU2MDMw")
        .then( response => response.json())
        .then( data => this.setState({data: data.response.result, loading:false}) )
        .catch( error => console.log(error));
    }
    
    handleItemClick(key){
        console.log(`app has selected set to: ${key}`);
        this.setState({selected:key});
    }
    
    handleSearchClick(keywords){
        console.log(`app has keywords set to: ${keywords}`);
        this.setState({keywords:keywords});
    }
    
    focusCallback(){
        console.log("focus callback");
        this.searchRef.current.focus();
    }
    
    render(){
        console.log("app rendering");
        var data = this.state.data.slice();
        if (this.state.keywords) {
            data = data.filter( item  => item.temperature.indexOf(this.state.keywords) > -1);
            console.log("app filtered array of items: ", toReturn);
        }
        
        var toReturn = this.state.loading ? 
            	 	(<h2>Loading...</h2>)
        		: 	(
                     <div>
                     <SearchField ref={this.searchRef}  onClick={(keywords)=> this.handleSearchClick(keywords)}/>
                         <table>
                            <th>Key</th><th>Temperature</th><th>Date</th>
                            { data.map ( item => 
                                    <RowItem 
                                        item={item} 
                                        key={item.key} 
                                        selected={this.state.selected == item.key} 
                                        onClick={(aKey) => this.handleItemClick(aKey)} /> 
                            )}
                        </table>
        				<FocusButton onClick={()=> this.focusCallback()}/>
        			</div>
        			);
        return toReturn;
    }
}

class RowItem extends React.Component {
	
    constructor(props){
        super(props);
    }
        
    onClick(event){
        console.log(`rowitem has key set to: ${this.props.item.key}`);
    	this.props.onClick(this.props.item.key)    
    }
        
    render(){

		var {key, temperature, creationDate} = this.props.item;
    	return (
			<tr onClick={ event => this.onClick(event)} style = {{color: this.props.selected ? "red" : "black"}}>
            	<td>{key}</td>
        		<td>{temperature}</td>
        		<td>{creationDate}</td>
        	</tr> 
        );   
    }
}

const SearchField = React.forwardRef((props, ref) => {

	const [keywords, setKeywords] = React.useState("");

	const handleChange = (event) => setKeywords(event.target.value);
	const onClick = (event) => {props.onClick(keywords)};

	return(
		<React.Fragment>
			<input type="text" onChange={handleChange} ref={ref}/>
			<button onClick={onClick}>Search!</button>
		</React.Fragment>
	);
});

function FocusButton(props) {

	const onClick = ()=> {
		props.onClick();
	}

	return (
		<button onClick={onClick}>Focus</button>
	)
}
        
ReactDOM.render(
	<App/>,
    document.getElementById("root")
)