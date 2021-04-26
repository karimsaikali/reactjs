const MyContext = React.createContext();

class ErrorBoundary extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {hasError: false};
    }
    
    componentDidCatch(error) {
        console.log("caught error");
    }
    
    static getDerivedStateFromError(error){
        return {hasError: true};
    }
    
    render(){
        if (this.state.hasError){
            return (<h2 style={{color:"red"}}>Error detected</h2>)
        }
        
        return this.props.children;
    }
}

class ErrorProneComponent extends React.Component {
    
    constructor(props){
        super(props);
        console.log(props);             
    }
    
    okClickHandler(event){
        console.log("ok");
        this.props.callback(event);
    }
    
    notOkClickHandler(event){
        console.log("not ok");
        throw new Error("boom"); // will not be caught
    }
    
    render(){
        // throw exception to check if error boundary works
         if (this.props.okClickCount > 5){
             throw new Error("boom");
         }
        return (
            <div>
            	<h3>clicked ok: {this.props.okClickCount}</h3>
            	<MyContext.Consumer>
            		{
            			(value)=><h4>Message: {value}</h4>
                    }
            	</MyContext.Consumer>
                <button onClick={(event)=>{this.okClickHandler(event)}}>OK</button>
                <br/>
                <button onClick={(event)=>{this.notOkClickHandler(event)}}>Not OK</button>
                <br/>
            </div>
        )
    }
}

class App extends React.Component {
        
    constructor(props){
        
        super(props);
        this.state = {"clickedOK":0};
    }
    
    handleOKButtonClick(event){
        this.setState({"clickedOK":  this.state.clickedOK + 1});       
    }
    
    render(){
        return (
            <div>
            	<MyContext.Provider value={"yo"}>
                    <ErrorBoundary>            			
                        <ErrorProneComponent callback={()=>{this.handleOKButtonClick()}} okClickCount={this.state.clickedOK}/>        				
                    </ErrorBoundary>
        		</MyContext.Provider>
            </div>
        );
    }
}

ReactDOM.render(
	<App/>,
    document.getElementById("root")
);