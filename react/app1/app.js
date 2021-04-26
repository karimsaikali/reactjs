class TitleComponent extends React.Component {

    render(){
        return <h1>{this.props.title}</h1>;
    }
}

class SectionOneComponent extends React.Component {

    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <h2>{this.props.title}</h2>
        );
    }
}

class ParagraphComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {content:"- no content -", count:0};
    }

    setContent(content){
        this.setState({content:content});
    }

    handleClick(e) {
        console.log("count before: "+ this.state.count);
      	this.setState({count:++this.state.count});
        console.log("count after: "+ this.state.count);
        console.log("content before: "+ this.state.content);
      	this.setState({content:this.state.content + this.state.count});
        console.log("content after: "+ this.state.content);
      	e.preventDefault();
    }

    render(){
        return (
            <div>
  	        	<div>
    	        	<p>{this.state.content}</p>
              	</div>
            	<input type="button" value="update" onClick={(event)=>this.handleClick(event)}/>
            </div>            
        );
    }
    
    componentDidMount() {
        console.log("Paragraph mounted");
    }

	componentWillUnmount() {
        console.log("Paragrand will ummount");
    }
}

class ItemListComponent extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {items: ["water", "fire", "wind", "earth"]};
    }
    
    render() {
        
        var count = 0;
        var items = this.state.items.map((item) => <ListItemComponent key={`item${++count}`} value={item}></ListItemComponent>);
        var list = (
            <ul>{items}</ul>
        ); 
        return list;
    }
}

class ListItemComponent extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		return <li>{this.props.value}</li>;
	}
}

class FormComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = {};
		this.state.temperature = 22;
		this.state.humidity = 55;
	}

	handleChange(event){
		this.setState({[event.target.name]: event.target.value});
	}

	render() {
		var form = (
			<form onSubmit={(event)=> this.handleSubmit(event)}> 
				<label>Temperature:</label>
				<select value={this.state.temperature} name="temperature" onChange={(event)=>this.handleChange(event)}>
					<option value="20">20</option>
					<option value="21">21</option>
					<option value="22">22</option>
					<option value="23">23</option>
				</select>
				<br/>
				<label>Humidity:</label>
				<select value={this.state.humidity} name="humidity" onChange={(event)=>this.handleChange(event)}>
					<option value="20">20</option>
					<option value="21">21</option>
					<option value="22">22</option>
					<option value="23">23</option>
				</select>
				<br/>
				<input type="text" value="hey"/>	
			</form>
		)
		return form;
	}
}

class PublisherComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			val: '1'
		};
	}

	syncHandler(event){		
		console.log("event value: ", event.target.value);
		this.setState({val: event.target.value});
	}

	render(){
	
		var val = this.state.val;
		console.log("rendering. New val is : " + val);
		return (
			<div>
				<br/>
				<SubscriberComponent name="sub1" syncHandler={(event)=>this.syncHandler(event)} val={val}/>
				<br/>
				<SubscriberComponent name="sub2" syncHandler={(event)=>this.syncHandler(event)} val={val}/>
			</div>
		);
	}
}

class SubscriberComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	onChangeHandler(event){
		this.props.syncHandler(event);
	}

	render(){
		console.log(`name ${this.props.name}`);
		return (		
			<input type="text" name={this.props.name} value={this.props.val} onChange={(event)=>this.onChangeHandler(event)}/>
		);
	}
}

const rootElt = (
    <div>
        <TitleComponent title="hello world" />
        <SectionOneComponent title="this is react" />
        <ParagraphComponent/>
        <ItemListComponent/>
        <FormComponent/>
        <PublisherComponent/>
    </div>
);

ReactDOM.render(
    rootElt,
    document.getElementById("root")
);