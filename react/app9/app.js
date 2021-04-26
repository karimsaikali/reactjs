class App extends React.Component {
    
    constructor(props){
        super(props);
        this.fRef = React.createRef();
    }
    
    focus(event){
        console.log("this: ", this);
        this.fRef.current.doFocus();
    }
    
    render(){
        // if you put value before ref it won't work (current will be null)
        return (
          <div>
            <FocusableInput ref={this.fRef} value="hello"/>  
          	<button onClick={(event)=>{this.focus(event)}}>Focus</button>
          </div>
        );
    }
}

// App can't reference FocusableInput because it is a functional component
// => doesn't have instances!
/*
function FocusableInput(props) {
    
    const myRef = React.useRef(0);
    
    const doFocus = ()=> {
        myRef.currrent.focus();
    }
    
    return (
        	<div>
        		<label>Focusable</label>
        		<input type="text" value={props.value} ref={myRef} />
        	</div>
	);
}
*/
class FocusableInput extends React.Component {
    
    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }
    
    doFocus(){
        this.myRef.current.focus();
    }
    
    render(){
        
        return (
            <div>
            	<input type="text" value={this.props.value} ref={this.myRef}/>
            </div>
        );
    }
}


ReactDOM.render(

	<App/>,
    document.getElementById("root")
);
