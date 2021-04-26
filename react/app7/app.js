class RegistrationForm extends React.Component {
    
    constructor(props){
        super(props);
        this.idRef = React.createRef();
    }
  
    refocus(event){
        console.log("idRef: ", this.idRef);
        this.idRef.current.focus();
        this.idRef.value = "focused";
    }
    
    /*
    render(){
        return (
        	
        	<form>
            	<input type="text" name="id" ref={this.idRef}/>
            	<br/>
            	<input type="text" name="description"/>
            	<br/>
            	<input type="button" onClick={(event)=>this.refocus(event)} value="refocus"/>
        	</form>
        )
    }*/
    
    render(){
        return (
        	<form>
            	<InputTextField name="id" ref={this.idRef}/>
            	<InputTextField name="description"/>
            	<input type="button" onClick={(event)=>this.refocus(event)} value="refocus"/>
        	</form>
        );
    }
};

class InputTextField extends React.Component {
    
    constructor(props){
        super(props);
        this.props.value = "";
        this.myRef = React.createRef();
    }
    
    focus(){
        this.myRef.current.focus();
    }
    
    render(){
        return (
            <div>
            	<input type="text" ref={this.myRef} value={this.props.value} name={this.props.name}/>
            </div>
        )
    }
}

ReactDOM.render(
	<RegistrationForm/>,
    document.getElementById("root")
);