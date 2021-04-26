class Publisher extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            msg:""
        };
    }
    
    handleChange(event) {
        this.setState({"msg": event.target.value});
    }
    
    broadcastFomSubscriber(event) {
        this.setState({"msg": event.target.value})
    }
    
    render(){
        return (
            <div>
                <b>Publisher</b>
                <br/>            
                <input type="text" onChange={(event)=>this.handleChange(event)}></input>
                <Subscriber msg={this.state.msg} broadcaster={(event)=>this.broadcastFomSubscriber(event)}/>
                <br/>
                <Subscriber msg={this.state.msg} broadcaster={(event)=>this.broadcastFomSubscriber(event)}/>
                <br/>
            </div>
        );
    };
}

class Subscriber extends React.Component {
    
    constructor(props){
        super(props);
    }
    
    handleChange(event){
        this.props.broadcaster(event);
    }
    
    render(){
        
        var message = this.props.msg;
        return (
            <input type= "text" value={message} onChange={(event)=>this.handleChange(event)}></input>
        );
    }
}

class PropagateStuff extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        
        const data = {
            color: "blue",
            font: "arial" 
        };
        const stuff = <Stuff color={data.color} font={data.font}/>;
        return (
            <div>
           		<Inner stuff={stuff}/>
           		<br/>
           		<Inner stuff={stuff}/>
           	</div>
        );
    }
}

class Stuff extends React.Component {
    
    render(){
        return (
            <div>
                <p>color is {this.props.color}</p>
                <br/>
                <p>font is {this.props.font}</p>
            </div>
        );
    }
}

class Inner extends React.Component {
    
    render() {
        return (
        	<div>
            	<p>Blablabla</p>
            	{this.props.stuff}
            </div>
        );
    }
}

const root = (
    <div>
    	<Publisher/>
    	<PropagateStuff/>
    </div>
);
    
ReactDOM.render(
	root,
    document.getElementById("root")
);