const AppContext = React.createContext(12);
console.log("Context: ", AppContext);

const App = () => {
   
    const [count, setCount] = React.useState(0);
    const [threshold, setThreshold] = React.useState(false);
	
    React.useEffect( ()=> {
       	console.log(`threshold has changed ${threshold}`);        
    	}, [threshold]
    )
    
    const handleClick = (event) => {
    	setCount(count + 1);
        if (count == 10){
            setThreshold(true);
        }       
    }
    
    return (
        <div>        	
        	<h2>Count</h2>
        	Count: {count}
        	<br/>
        	<AppContext.Provider value ={5}>
       			<Inner1/>        			
        	</AppContext.Provider>
        	<input type="button" value="+" onClick={handleClick}/>
        </div>
    );
}

const Inner1 = () => {
    
   return (
       	<b>
    		<Inner2/>     
       	</b>
   );
}

const Inner2 = () => {
    
   return (
            <AppContext.Consumer>
            	{
                    (value) => <b>{value}</b>
                }
            </AppContext.Consumer>
        );
}

ReactDOM.render(
	<App/>,
    document.getElementById("root")
);