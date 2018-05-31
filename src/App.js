import React, { Component } from 'react';
import './App.css';

const apiKey = 'd013ee74a7db96db1eb4894b0772b3cc';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: `https://api.openweathermap.org/data/2.5/weather?q=Caracas&units=metric&APPID=${apiKey}`,
      city: ''
    }
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    getData(){
      let url = this.state.url;
      fetch(url).then(function(res){
        return res.json();
      }).then(function (data){
        console.log(data);
        this.setState({
          location : data.name,
          country :data.sys.country,
          temp : Math.round(data.main.temp),
          weather : data.weather[0].main,
          icon : data.weather.icon
        });
    }.bind(this));
  }

    componentWillMount(){
      this.getData();
    }

    handleChange(e) {
      this.setState({city: e.target.value})
    }

    handleSubmit(e){
      e.preventDefault();
      this.setState({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&APPID=${apiKey}`
      },()=>{
        this.getData();
      });
    }

    
  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col">
            <div className="weather-card one">
              <div className="top">
                <div className="wrapper">
                  <h1 className="heading">{this.state.weather}</h1>
                  <h3 className="location">{this.state.location}, {this.state.country}</h3>
                  <p className="temp">
                    <span className="temp-value">{this.state.temp}</span>
                    <span className="deg">0</span>
                    <a href="javascript:;"><span className="temp-type">C</span></a>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
          <div style={{textAlign : "center"}}>
          <form onSubmit={this.handleSubmit}>
             <input value={this.state.city} onChange={this.handleChange}
             type='text' placeholder='Enter a City and press Enter'>
             </input>
             <button type="submit">Submit</button>
          </form>   
          </div>  
  
      </div>
    )
  }
};

export default App;
