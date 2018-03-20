import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import Menu from './components/Menu';

class App extends Component {

    constructor(){
        super();
        this.state={mainTitle:"Hello"}
    }

    changeMain(state){
        this.setState({mainTitle:state});
    }

    render() {
        return (
          <div className="App">
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
              <Menu changeMain={this.changeMain.bind(this)}/>
              <Main mainTitle={this.state.mainTitle}/>
          </div>
        );
  }
}

export default App;
