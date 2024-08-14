
import * as React from 'react';
import Foldy from 'foldy';

interface Props {
}
interface State {
  weatherOpenStates: boolean[]
}

export default class App extends React.Component<Props, State> {

  twemojiIconList = [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2600.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2601.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26c5.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26c8.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f325.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f326.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@13.0.2/assets/svg/1f327.svg',
  ]
  cityList = [
    'Berlin',
    'Ho Chi Minh City',
    'Tokyo',
    'Singapore',
    'New York'
  ]

  weatherData: any[]

  constructor(props: Props) {
    super(props);

    this.state = {
      weatherOpenStates: Array.from(Array(this.cityList.length), () => false)
    };

    this.weatherData = this.generateWeatherData();
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(idx: number) {
    let { weatherOpenStates } = this.state;
    weatherOpenStates[idx] = !weatherOpenStates[idx];
    this.setState({
      weatherOpenStates: weatherOpenStates
    });
  }

  random(min = 0, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  randomIconUrl() {
    return this.twemojiIconList[this.random(0, this.twemojiIconList.length)]
  }

  randomPercentage() {
    return this.random(0, 100);
  }

  randomHighTemp() {
    return this.random(25, 37);
  }

  randomLowTemp() {
    return this.random(10, 25);
  }

  randomWind() {
    return this.random(1, 25);
  }

  generateWeatherData() {
    let weatherData: any[] = [];
    const weekdays = ['Mon', ' Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    for (let i = 0; i < this.cityList.length; ++i) {
      let forecast: any[] = [];
      for (let j = 0; j < 7; ++j) {
        let fc = {
          weekday: weekdays[j],
          icon: this.randomIconUrl(),
          high: this.randomHighTemp(),
          low: this.randomLowTemp()
        };
        forecast = forecast.concat(fc);
      }
      let data = {
        icon: this.randomIconUrl(),
        currentTemp: this.randomHighTemp(),
        precipitation: this.randomPercentage(),
        huminity: this.randomPercentage(),
        wind: this.randomWind(),
        forecast: forecast
      }

      weatherData = weatherData.concat(data);
    }

    return weatherData;
  }

  render() {
    let foldyList: any[] = [];
    for (let i = 0; i < this.cityList.length; ++i) {
      let data = this.weatherData[i];

      const front = <div className='front'
        onClick={() => this.handleClick(i)}>
        <div className='front-left'>
          <img src={data.icon} className='front-icon' />
          <span className='front-temp'>{data.currentTemp}°C</span>
        </div>
        <div className='front-right'>
          <ul>
            <li>Precipitation: {data.precipitation}%</li>
            <li>Huminity: {data.huminity}%</li>
            <li>Wind: {data.wind}km/h</li>
          </ul>
        </div>
      </div>;

      const pane0 = <div className='pane pane0' onClick={() => this.handleClick(i)}>
        <div className='pane--left'>
          <ul className='detail'>
            <li>Feels like: 34°</li>
            <li>Wind: SSE {data.wind} km/h</li>
            <li>Wind Gusts: 17 km/h</li>
          </ul>
        </div>
        <div className='pane--right'>
          <ul className='detail'>
            <li>Humidity: {data.huminity}%</li>
            <li>Dew Point: 25°</li>
            <li>Max UV Index: 0 (Low)</li>
          </ul>
        </div>
      </div>;

      const pane1 = <div className='pane pane1' onClick={() => this.handleClick(i)}>
        <div className='pane--left'>
          <ul className='detail'>
            <li>Cloud Cover: 50%</li>
            <li>Rain: 0.0 mm</li>
            <li>Snow: 0.0 cm</li>
          </ul>
        </div>
        <div className='pane--right'>
          <ul className='detail'>
            <li>Ice: 0.0 mm</li>
            <li>Visibility: 16 km</li>
            <li>Ceiling: 6492 m</li>
          </ul>
        </div>
      </div>;

      let forecastList: any[] = [];
      for (let j = 0; j < 7; ++j) {
        let forecast = <li className='forecast' key={j}>
          <div className='weekday'>{data.forecast[j].weekday}</div>
          <img src={data.forecast[j].icon} className='weekday--icon' />
          <div className='weekday--temp'><span className='high'>{data.forecast[j].high}°</span> - <span className='low'>{data.forecast[j].low}°</span></div>
        </li>;

        forecastList = forecastList.concat(forecast);
      }

      const pane2 = <div className='pane pane2' onClick={() => this.handleClick(i)}>
        <ul>
          {forecastList}
        </ul>
      </div>;


      const list = [
        pane0,
        pane1,
        pane2
      ];

      const cityFoldy = <div className='city' key={i} >
        <h2>{this.cityList[i]}</h2>
        <Foldy
          front={front}
          list={list}
          duration={500}
          open={this.state.weatherOpenStates[i]}
          customClass={`foldy-${i}`}
        />
      </div>

      foldyList = foldyList.concat(cityFoldy);
    }


    return <>
      {foldyList}
    </>;
  }
}

