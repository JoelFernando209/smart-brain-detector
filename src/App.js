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
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'c9917e7c78d64ee49fd19d1faf63f0dd'
});

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


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      inputSecret: '',
      route: 'signin'
    }
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
    
    const image = document.getElementById('inputimage');
    
    const width = Number(image.width);
    const height = Number(image.height);
    
    console.log(width, height);
    
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
  
  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log('Clarifai Error: ', err));
  }
  
  onSecretSubmit = () => {
    this.setState({route: this.state.inputSecret})
  }
  
  onRouteChange = (route) => {
    this.setState({route: route})
  }
  
  renderRoute = () => {
    const onRouteChange = this.onRouteChange;
    const { boxes, imageUrl } = this.state;
    switch (this.state.route) {
      case 'signin':
        return <SignIn onRouteChange={onRouteChange}/>
      case 'register':
        return <Register onRouteChange={onRouteChange}/>
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
            <h2 className="f1 center mt5">AHHHHHHHHH HEROKU AAAAAAAAAAAAAAAAAAAAAAAAAAH Family ❤️!</h2>
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
            <Rank />
            <ImageLinkForm
              onClick= {this.onSubmit}
              onInputChange = {this.onInputChange}
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