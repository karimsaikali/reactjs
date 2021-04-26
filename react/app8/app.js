class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            count: 0
        };
    }
    
    componentDidCatch(error){
        console.log("caught error: ");
    }
    
    static getDerivedStateFromError(error) {
        console.log("derived state from error: ", error);
        return {hasError: true};
    }
    
    handleKaboomChange(event){
        console.log("handle Kaboom change");
        this.setState({count: this.state.count + 1});
    }
    
    render(){        
        return (
            <div>            	
             {
                 this.state.hasError ? 
              	 <p style={{color:"red"}}>Error!</p>  
            	: <Kaboom value={this.state.count} handleChange={ () => this.handleKaboomChange() } />
			}
            </div>
        );
    }
}

class Kaboom extends React.Component {
    
    constructor(props){
        super(props);
        if (!props.value){
            this.props.value = "";
        }
    }
    
    onChange(event){
        this.props.handleChange(event);
    }
    
    componentDidUpdate(){
        console.log("Kaboom updated");
        if (this.props.value == 10) throw new Error("too much");
    }
    
    render(){
        
        console.log("Kaboom rendering");
        return (
            <div>
            	<input type="text" onChange={ (event) => {this.onChange(event)} } value={this.props.value}/> 
            </div>
        );
    }
}

ReactDOM.render(    
    <App/>,
    document.getElementById("root")
);