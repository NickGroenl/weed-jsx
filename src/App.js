import './css/App.css';
import React , {Component} from "react";
import RunSearcher from './components/searcher.jsx';
import RunStrain from './components/strains.jsx';

import {
    BrowserRouter as Router,
    Switch,
    Route
    
} from "react-router-dom";



function RunIcons(){
    return (
        <div className="footer">
            <a href="http://www.cannabisreports.com/"> <ion-icon name="analytics-sharp"></ion-icon> </a>
            <a href="https://github.com/Xylospeed"> <ion-icon name="logo-github"></ion-icon></a>
            <a href="https://www.youtube.com/channel/UCnW-E80Med85t1bpW3xgR2g"> <ion-icon name="logo-youtube"></ion-icon> </a>
        </div>
    )
}

class App extends Component {
   

    render(){  
        return (
            <Router>
                
                <div className="container-fluid">
                    <Switch>
                        <Route path='/strains/:id'>
                            <div className="row">
                                <img className="weed-icon" src="https://img.icons8.com/plasticine/2x/marijuana-leaf.png" alt="weed-logo"></img>
                            </div>
                            <RunStrain> </RunStrain>
                        </Route>
                        <Route path='/'>
                            <RunSearcher> </RunSearcher>
                        </Route>
                        
                    </Switch>
                    <RunIcons></RunIcons>
                </div>
                
            </Router>
        );
    }
}

export default App;