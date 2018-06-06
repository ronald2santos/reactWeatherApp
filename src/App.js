import React, { Component } from 'react';
import './App.css';
// import FlagIcon from './FlagIcon'
import styled from 'styled-components';
import loader from "./lib/loader/rings.svg";

const apiKey = 'd013ee74a7db96db1eb4894b0772b3cc';

const AnimateLoad = (WrappedComponent) => {
  return class extends React.Component {
      state = {didMount: false}
      componentDidMount(){
         setTimeout(() => {
              this.setState({didMount: true})
          }, 0)
      }
      render(){
          const {didMount} = this.state
          return (
              <div className={`fade-in ${didMount && 'visible'}`}>
                 <WrappedComponent {...this.props} />
              </div>
          );
      }
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: `https://api.openweathermap.org/data/2.5/weather?q=Caracas&units=metric&APPID=${apiKey}`,
      city: '',
      bgURL:'',
      loading:false,
    }
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    getData(){
      this.setState({loading:true});
      let url = this.state.url;
      fetch(url).then(function(res){
        return res.json();
      }).then(function (data){
        console.log(data);
        console.log(data.weather[0].main);
        if (data.weather[0].main === "Rain"){
        this.setState({bgURL : "https://i.gifer.com/OKaX.gif"});
      } else if(data.weather[0].main === "Drizzle"){
        this.setState({bgURL : "https://i.gifer.com/OKaX.gif"});
      } else if(data.weather[0].main === "Snow"){
        this.setState({bgURL : "https://i.pinimg.com/originals/a2/77/6b/a2776bbda047c1f30a677f67e52feddd.gif"});
      } else if(data.weather[0].main === "Clouds"){
        this.setState({bgURL : "https://78.media.tumblr.com/48e954897c5e5c64ae01d452f04be63a/tumblr_np33qatb3K1qkprgpo1_500.gif"});
      } else if(data.weather[0].main === "Thunderstorm"){
        this.setState({bgURL : "http://37.media.tumblr.com/4920175632f67df898511f9309dec33f/tumblr_n76b37h4eM1sgk0tao1_500.gif"});
      } else if(data.weather[0].main === "Clear"){
        this.setState({bgURL : "http://www.taneyservices.com/wpimages/wpc17a9c99.gif"});
      };
        this.setState({
          location : data.name,
          country :data.sys.country,
          temp : Math.round(data.main.temp),
          weather : data.weather[0].main,
          description: data.weather[0].description,
          icon : data.weather.icon,
          loading: false,
          errorMsg: ''
        });
    }.bind(this)).catch(function(error){
      this.setState({
        loading: false,
        errorMsg: "Please, enter a valid city"
      })}.bind(this));
  }

    
  componentDidMount(){
      this.getData()
    }

    handleChange(e) {
      this.setState({city: e.target.value})
    }

    handleSubmit(e){
      e.preventDefault();
      this.setState({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&APPID=${apiKey}`
      }, ()=>{
        this.getData();
      })
      console.log(this.state.bgURL)
      console.log(this.state.weather)
    }
    
  render() {
    let background = {
      backgroundImage : `url(${this.state.bgURL})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }

    return (
  
      <div className="App" >
        <div className="row">
          <div className="col">
            <div className="weather-card one" style={background}>
              <div className="top">
              {this.state.loading ? <div className="wrapper">  <img src={loader} style={{textAlign:"center", paddingTop:"300px"}}/> </div>  :                 
                  <div className="wrapper">
                  <h1 className="heading">{this.state.weather}</h1>
                  <h3 className="location">{this.state.location}, {this.state.country}</h3>
                  <p className="temp">
                    <span className="temp-value">{this.state.temp}</span>
                    <span className="deg">0</span>
                    <a href="javascript:;"><span className="temp-type">C</span></a>
                    <h6 className="description">{this.state.description}</h6>
                    <h6 style={{color : "white"}}>{this.state.errorMsg}</h6>
                  </p> </div>}
              </div>
            </div>
          </div>

        </div>
          <div style={{textAlign : "center"}}>
          <form onSubmit={this.handleSubmit}>
             <input value={this.state.city} onChange={this.handleChange}
             type='text' placeholder='Enter City and press Submit'>
             </input>
             <button type="submit">Submit</button>
          </form>   
          </div>  
  
      </div>
    )
  }
};

export default AnimateLoad(App);
