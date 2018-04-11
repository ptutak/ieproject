import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import Menu from './components/Menu';

class App extends Component {

    constructor(){
        super();
        this.state={
            welcomeTitle:"Hello",
            mainSites:["Welcome","Books", "AddBook","Authors","AddAuthor"],
            actualSite:"Welcome"
        };
        this.changeMain=this.changeMain.bind(this);
        this.changeWelcomeTitle=this.changeWelcomeTitle.bind(this);
    }

    changeWelcomeTitle(state){
        this.setState({welcomeTitle:state});
    }

    changeMain(state){
        switch (state){
            case "Welcome":
                this.setState({actualSite:"Welcome"});
                break;
            case "Books":
                this.setState({actualSite:"Books"});
                break;
            case "AddBook":
                this.setState({actualSite:"AddBook"});
                break;
            case "Authors":
                this.setState({actualSite:"Authors"});
                break;
            case "AddAuthor":
                this.setState({actualSite:"AddAuthor"});
                break;
            default:
                this.setState({actualSite:"Welcome"});
        }
    }

    render() {
        return (
          <div className="App">
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
              <Menu changeMain={this.changeMain} changeWelcomeTitle={this.changeWelcomeTitle}/>
              <Main changeMain={this.changeMain} mainSite={this.state.actualSite} mainSites={this.state.mainSites} welcomeTitle={this.state.welcomeTitle}/>
          </div>
        );
  }
}

export default App;
