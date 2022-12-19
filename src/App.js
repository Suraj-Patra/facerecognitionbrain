import { useState } from 'react';
import ParticlesBg from 'particles-bg';

import Navigation from './components/Navigation/Navigation.jsx';
import Logo from './components/Logo/Logo.jsx';
import Signin from './components/Signin/Signin.jsx';
import Register from './components/Register/Register.jsx';
import Ranks from './components/Ranks/Ranks.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.jsx';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  const displayFaceBox = (box) => {
    setBox(box);
  }
  const onInputChange = (e) => {
    setInput(e.target.value);
  }
  const onButtonSubmit = () => {
    setImageUrl(input);

    // The old technique which is shown in the video wouldn't work. You have to use the new technique. Here you do not have to install clarifai or import it. 
    // Resource for the docs and solution : https://docs.clarifai.com/api-guide/predict/images/
    // Sample image links : 
    // https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528
    // https://www.faceapp.com/static/img/content/compare/beard-example-before@3x.jpg

    const USER_ID = 'trasuraj';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '9eedcc0643464daf8490030de1571f63';
    const APP_ID = 'my-first-application';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = input;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => displayFaceBox( calculateFaceLocation(result) ))
        .catch(error => console.log('error', error));
    
  }
  const onRouteChange = (path) => {
    if(path==='signout'){
      setIsSignedIn(false);
    }else{
      setIsSignedIn(true); 
    }
    setRoute(path);
  }


  return (
    <div className="App">
      <ParticlesBg type="circle" bg={true} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {
        route === 'home' 
        ?<div>
          <Logo />
          <Ranks />
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div> 
        : (route === 'signin' 
            ? <Signin onRouteChange={onRouteChange} /> 
            : <Register onRouteChange={onRouteChange} />
          ) 
      }
    </div>
  );
}

export default App;




// Problems in this app are : not optimized, can't detect multiple faces