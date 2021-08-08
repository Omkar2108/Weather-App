import React, { Component } from 'react';
import axios from 'axios';

class weathernew extends Component {
    constructor(props) {
        super(props);
        this.state={
            error: false,
            minTemp:0,
            maxTemp:0,
            temp:0,
            rainPercentage:0,
            description:"",
            city:""
        }
    }

    handleGet=()=>{
        if(this.state.city !==''){
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=b21162b7c2cf10f1d77bbb5b7cd701f4
    `)
    .then((res)=>{
        // res=JSON.stringify(res);
        // console.log(res["data"]["main"]["temp"]);
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
        }
        else{
            this.setState({error:true});
            setTimeout(()=>{
                this.setState({error:false});
            }, 2000);
            
        }
    }


    render() {
        return (
            <div>
                <div>
                    <input className="search" type='text' placeholder="Search..." onChange ={(e)=>this.setState({city:e.target.value})} />
                    <button onClick={()=>this.handleGet()}>Get Result</button>
                </div>
            </div>
        );
    }
}

weathernew.propTypes = {

};

export default weathernew;