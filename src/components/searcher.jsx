import {
    ProgressBar,
    progressBarFetch,
    setOriginalFetch,
  } from 'react-fetch-progressbar';
import {
    Link
} from "react-router-dom";
import React , {Component} from "react";


setOriginalFetch(window.fetch);
window.fetch = progressBarFetch;


function analitycData(json, input){
    var similars = 0;
    var array = [];
    for(var i=0; i<json.length; i++)
    {
        for(var c=0;c<json[i].name.length;c++)
        {
            if(json[i].name[c] === input[c])
            {
                similars++;
            }
        }
        if(similars > 3){
            array.push(json[i]);
            similars = 0;
        }else if(c > json[i].name.length -1) similars = 0;
    }
    const uniques = array.filter((item, idx) => array.indexOf(item) === idx);
    return uniques;
}

class RunSearcher extends Component{
    constructor(parameter){
        super(parameter);
        this.state = {
            value : '',
            err : '',
            arr : [],
            correctly : 'ul-card'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        this.setState({value: event.target.value});
        if(this.state.value.length > 3)
        this.setState({ err: 'form-yes'})
        else this.setState({ err : ''})

        if(this.state.value.length > 3)
        {
            fetch (`https://gist.githubusercontent.com/hew/7be29a306f8329e19ef92618a3a801bd/raw/4dc0dd8e1c6605e573497bb8fd50f19d83dc0577/data.json`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(json => 
                {
                    this.setState({ arr : analitycData(json.data, this.state.value)}) 
                    if(this.state.arr.length > 1)
                    {
                        this.setState({ correctly : 'ul-card active'});
                        this.render()
                    }
                });
        }
    }
    handleSubmit(event) {
        if(this.state.value.length > 3 )
        {
            this.setState({ err: ''});
        } else this.setState({ err: 'form-error'});
        event.preventDefault();
    }
    render(){
        var namesList = this.state.arr.map(function(arr, index){
            return ( 
            <li key={index} className="li-card">
                <Link to={'/strains/'+ arr.ucpc} className="li-card-Link">{arr.name}</Link>
            </li>
            );
        })
        return(
            <div>
                <ProgressBar/>
                    <div className="row">
                        <img className="weed-icon" src="https://img.icons8.com/plasticine/2x/marijuana-leaf.png" alt="weed-logo"></img>
                    </div>
                <div className="container">
                    <div className="row">
                        <div className="content-loading">
                            <form className="form-body" onSubmit={this.handleSubmit}>
                                <label>
                                    <input className={this.state.err} type="text" placeholder="type's cannabis" value={this.state.value} onChange={this.handleChange}/>
                                </label>
                                <input type="submit" id="form-search" value="Search"/>
                            </form>
                            <ul className={this.state.correctly}>
                            { namesList }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}


export default RunSearcher;