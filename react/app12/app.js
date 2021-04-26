const AppContext = React.createContext();

class App extends React.Component {
    
    constructor(props){
        super(props);
        this.props.key = "123456789";
    }
    
    render(){
        return (
            <AppContext.Provider value={this.props.key}>
                <Paragraph/>    
            </AppContext.Provider>
        )
    }
}

class Paragraph extends React.Component {
    
    constructor(props){
        super(props);
    }
    
    render(){
        return (
        	<AppContext.Consumer>
            {
                (value) => <div>The key is {value}</div>
            }
            </AppContext.Consumer>
        )
    }
}

ReactDOM.render(
	<App/>,
    document.getElementById("root")
);