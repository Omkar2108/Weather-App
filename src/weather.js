import React, { Component } from 'react';
import axios from 'axios';
import './weather.css';

// const API_KEY="b21162b7c2cf10f1d77bbb5b7cd701f4";

export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state={
            temp:undefined,
            minTemp:undefined,
            maxTemp:undefined,
            humidity:undefined,
            rainPercentage:undefined,
            description:undefined,
            city:"",
            sunrise:undefined,
            sunset:undefined,
            icon:undefined,
            name:undefined,
            country:undefined
        }
    }
    Api_key=process.env.REACT_APP_API_KEY;
    handleGet=()=>{
      if(this.state.city!=="" && (this.state.city).length > 2){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${this.Api_key}&units=metric`)
    .then((res)=>{
        // console.log(res);

        this.setState({
            temp:res.data.main.temp,
            minTemp:res.data.main.temp_min,
            maxTemp:res.data.main.temp_max,
            humidity:res.data.main.humidity,
            wind:res.data.wind.speed,
            sunrise:new Date(res.data.sys.sunrise*1000).toTimeString().slice(0, 9),
            sunset:new Date(res.data.sys.sunset*1000).toTimeString().slice(0, 9),
            description:res.data.weather[0].main,
            icon:"http://openweathermap.org/img/w/"+res.data.weather[0].icon+".png",
            name:res.data.name,
            country:res.data.sys.country,
        });

    }).catch((err)=>{
        // console.log(err);
    })
      }
    }

    render() {
        return (
            <div>
                 <div className={(typeof this.state.temp != "undefined") ? ((this.state.temp > 10) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            id="search"
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => {
              this.setState({city:e.target.value})
            }}
            onKeyPress={(e)=>this.handleGet(e)}
          />
        </div>
        {(typeof this.state.temp != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{this.state.name}, {this.state.country}</div>
            <div className="date">{}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
                <img alt="" src={this.state.icon}/>
              {Math.round(this.state.temp)}°c
            </div>
            <div className="weather">{this.state.description}</div>
            <div className="sun">
                
                <p><svg style={{fill:"yellow"}} height="30"width="30" className="Icon--icon--1T0KB SunriseSunset--sunIcon--KnGtQ" set="current-conditions" name="sunrise-line" theme="" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Sun Rise</title><path d="M10.862 6.052v5.329a.75.75 0 0 0 1.5 0V6.036l1.772 1.534a.75.75 0 0 0 .982-1.134l-3.003-2.601a.75.75 0 0 0-.982 0L8.128 6.436A.75.75 0 0 0 9.11 7.57l1.752-1.518zM21 19.128a.75.75 0 0 0 0-1.5H3.167a.75.75 0 1 0 0 1.5H21z"></path></svg>  {this.state.sunrise}
                   <svg style={{fill:"yellow"}} height="30"width="30" className="Icon--icon--1T0KB SunriseSunset--sunIcon--KnGtQ" set="current-conditions" name="sunset-line" theme="" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Sunset</title><path d="M10.862 9.853L9.044 8.278a.75.75 0 1 0-.982 1.134l3.003 2.602a.75.75 0 0 0 .982 0l3.004-2.602a.75.75 0 0 0-.983-1.134l-1.706 1.478V4a.75.75 0 0 0-1.5 0v5.853zM21 19.075a.75.75 0 1 0 0-1.5H3.167a.75.75 0 1 0 0 1.5H21z"></path></svg>  {this.state.sunset}</p>
            </div>
            

            
            <div className="other">
                <div id="textbox">
            <p className="alignleft">High/Low</p>
            <p className="alignright">{this.state.minTemp}/{this.state.maxTemp} °c</p>
            </div> 

   
               <div id="textbox">
            <p className="alignleft">Wind Speed</p>
            <p className="alignright">{this.state.wind} Km/Hr</p>
            </div>

                <div id="textbox">
            <p className="alignleft">humidity</p>
            <p className="alignright">{this.state.humidity}% </p>
            </div>

            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
    
            </div>
        );
    }
}