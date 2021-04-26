function App(props) {
    
    const [count, setCount] = React.useState(0);
	const ref = React.createRef();
    
    React.useEffect(
    	()=>{
            console.log("state changed!", count);
        }    
    )
    
    const handleClick = (event) => {
        console.log("Click on ", event.target);
        setCount(count + 1);
        ref.current.focus();
        console.log("ref: ", ref);
    }
    
    return (
    	<div>
        	<FocusableInput ref={ref} value={count} />
        	<button onClick={handleClick}>Vazy Quique! </button>
        </div>
    )
}

const FocusableInput = React.forwardRef(
    (props, ref) => {
		return (
        	<input type="text" ref={ref} value={props.count}/>
        );    
	}
);

ReactDOM.render(
	<App/>,
    document.getElementById("root")
);