import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import Secret from './components/Secret/Secret.js';
import './App.css';
import Particles from 'react-particles-js';

const particleOptions = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
};

const initialState = {
      input: '',
      imageUrl: '',
      boxes: [],
      inputSecret: '',
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    };

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      inputSecret: '',
      route: 'signin',
      user: initialState
    }
  }
  
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
    
    const image = document.getElementById('inputimage');
    
    const width = Number(image.width);
    const height = Number(image.height);
    
    return clarifaiFace.map(face => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)
      }
    });
  }
  
  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes})
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  
  onSecretChange = (event) => {
    this.setState({inputSecret: event.target.value})
  }
  
  onTest = (req, res, next) => {
    this.setState({input: 'https://static2.lasprovincias.es/www/multimedia/201903/09/media/cortadas/montaneros-muertos-kkqB-U70863773813CPG-624x385@RC.jpg'});
    
    this.setState({imageUrl: this.state.input})
  }
  
  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('https://whispering-beyond-64828.herokuapp.com/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
    .then(res => res.json())
    .then(response => {
      if(response) {
        fetch('https://whispering-beyond-64828.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(res => res.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(err => console.warn('Error :('))
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log('There was an error, please try again'));
  }
  
  onSecretSubmit = () => {
    this.setState({route: this.state.inputSecret})
  }
  
  onRouteChange = (route) => {
    if(this.state.route === 'signout'){
      this.setState(initialState)
    } else {
      this.setState({route: route})
    }
  }
  
  renderRoute = () => {
    const onRouteChange = this.onRouteChange;
    const { boxes, imageUrl } = this.state;
    switch (this.state.route) {
      case 'signin':
        return <SignIn
                loadUser={this.loadUser}
                onRouteChange={onRouteChange}
                />
      case 'signout':
        return <SignIn
                loadUser={this.loadUser}
                onRouteChange={onRouteChange}
                />
      case 'register':
        return <Register
                onRouteChange={onRouteChange}
                loadUser={this.loadUser}
                />
      case 'secretRoute':
        return <Secret onRouteChange={onRouteChange}/>
      case 'secretTreasure':
        return (
          <div className="tc">
            <h2 className="f1 center mt5">You found the Secret Treasure!</h2>
            <h4>Here... Take gold!</h4>
            <img src="https://lh3.googleusercontent.com/proxy/Wvue7u02JENr7KEM6SdchDP-YlrhGNwGn8E4POUw5n1KVzieL-I1tVaCLuYekkBee05pDno-DNF6uIN8U1niW96SyJ54Y8zC99hnZdQ1M_IJe3MwhjzoJp7KznmOma317-Cl" alt=""/>
            <p className="pointer grow" onClick={() => onRouteChange('signin')}>Go back to Sign In</p>
          </div>
        )
      case 'ztm':
        return (
            <div className="tc">
            <h2 className="f1 center mt5">Love all the ZTM Family. They are epic mai pana! <span role="img" aria-label="xxxxx">❤️</span>!</h2>
            <h4>Just thanks for all!</h4>
            <img src="https://images.ctfassets.net/aq13lwl6616q/6MNZFJQPNCXM7lM7RsCdug/98399875596dd1f867c92c25ed16727a/SHAPE-ONLY.png" alt=""/>
            <p className="pointer grow" onClick={() => onRouteChange('signin')}>Go back to Sign In</p>
          </div>
        )
      default:
        return(
          <div>
            <Navigation
              onRouteChange={onRouteChange}
            />
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onClick= {this.onSubmit}
              onInputChange = {this.onInputChange}
              onTest={this.onTest}
            />
            <FaceRecognition
              onSecretChange={this.onSecretChange}
              onSecretClick={this.onSecretSubmit}
              boxes={boxes}
              imageUrl={imageUrl}
            />
          </div>
        )
    }
  }
  //hello
  render(){
    return (
      <div>
        <Particles
            className="particles"
            params={particleOptions} />
          {
            this.renderRoute(this.state.route)
          }
      </div>
    )
  }
}

export default App;