import React, { Component } from 'react';


class Main extends Component {
    render() {
        let mainSite;


        switch(this.props.mainSite){
            case "Welcome":
                mainSite=
                    <div>
                        <h1>
                            It's WORKING!!!
                            WELCOME!!!
                        </h1>
                    </div>;
                break;
            default:
                mainSite=
                    <div>
                        Hello!!! ;)
                    </div>
        }


        return mainSite;
    }
}

export default Main;