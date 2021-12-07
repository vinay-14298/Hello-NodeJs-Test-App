// to require lib module
import React,{Component} from 'react'
import ReactDom from 'react-dom';

import Header from './components/Header';
import JSON from './users.json';
import NewsList from './components/NewsList';
import axios from "axios";

// Logical and html
class App extends Component {
    constructor(props){
        super(props);

        this.state={
            news:JSON,
            filtered:JSON
        }
    }
    componentDidMount() {
        axios.get("/users.json").then((response) => {
          this.setState({ news: response.data,filtered : response.data });
        });
      }
    filterNews(keyword){
        const output = this.state.news.filter((data)=>{
            return data.title.indexOf(keyword)> -1;
        })

        this.setState({filtered:output})
    }


    render(){
        return(
            <div>
                <Header newsSearch={(userText)=>{this.filterNews(userText)}}/>
                <hr/>
                <NewsList datalist={this.state.filtered}/>
            </div>
        )
    }
}

export default App;
