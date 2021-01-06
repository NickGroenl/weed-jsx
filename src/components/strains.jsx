import {
    useParams
} from "react-router-dom";
import React from "react";
import '../css/strains.css';


function localizeIndex(json, code)
{
    for(var i=0; i<json.length; i++)
    {
        if(json[i].ucpc === code) return i;
    }
    return -1;
}




function RunStrain() {

    const {id} = useParams();    
    const [name, setName] = React.useState([]);
    const [image, setImage] = React.useState([]);
    const [qr, setQr] = React.useState([]);
    const [lineage, setLineage] = React.useState([]);
    const [genetic, setGenetic] = React.useState([]);

    fetch (`https://gist.githubusercontent.com/hew/7be29a306f8329e19ef92618a3a801bd/raw/4dc0dd8e1c6605e573497bb8fd50f19d83dc0577/data.json`, {
                method: 'GET'
    })
    .then(response => response.json())
    .then(json => 
    {
        const index = localizeIndex(json.data, id);
            
        setName(json.data[index].name);
        setImage(json.data[index].image);
        setQr(json.data[index].qr);
        setLineage(json.data[index].seedCompany.name);
        setGenetic(json.data[index].genetics.names);
    })
    
    
   return(
        <div className="card-body">
            <div className="jumbo">
            </div>
            <img src={image} alt="cannabis" className="card-image"></img>
            <p className="card-title"> {name}</p>
            <div>
                <p className="text-inf"> UCPC: {id}</p>
                <p> Genetic: {genetic}</p>
                
                <p className="text-rounded"> Lineage: {lineage}</p>
            </div>
            <img src={qr} alt="cannabis" width='100vw' height='100vh' className="align-left"></img>
        </div>
    )
}

export default RunStrain;