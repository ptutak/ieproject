import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import Menu from './components/Menu';

class App extends Component {

    constructor(){
        super();
        this.state={
            welcomeTitle:"Welcome to the Library!",
            actualSite:"Welcome",
            credentials:null
        };
        this.changeMain=this.changeMain.bind(this);
        this.changeWelcomeTitle=this.changeWelcomeTitle.bind(this);
        this.setCredentials=this.setCredentials.bind(this);
        this.getCredentials=this.getCredentials.bind(this);
    }

    setCredentials(credentials){
        this.setState({credentials:credentials});
    }

    getCredentials(){
        return this.state.credentials;
    }

    changeWelcomeTitle(state){
        this.setState({welcomeTitle:state});
    }

    changeMain(state){
        switch (state){
            case null:
                if (this.state.credentials)
                    this.setState({welcomeTitle:"You are logged in"});
            default:
                this.setState({actualSite:state});
        }
    }

    render() {
        return (
          <div className="App">
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
              <Menu
                  changeMain={this.changeMain}
                  changeWelcomeTitle={this.changeWelcomeTitle}
                  setCredentials={this.setCredentials}
                  credentials={this.state.credentials}
              />
              <Main
                  changeMain={this.changeMain}
                  mainSite={this.state.actualSite}
                  welcomeTitle={this.state.welcomeTitle}
                  changeWelcomeTitle={this.changeWelcomeTitle}
                  setCredentials={this.setCredentials}
                  credentials={this.state.credentials}
              />
          </div>
        );
  }
}

export default App;
