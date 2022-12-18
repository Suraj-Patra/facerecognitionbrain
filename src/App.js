import { useState } from 'react';
import ParticlesBg from 'particles-bg';
// import Clarifai from 'clarifai';

import Navigation from './components/Navigation/Navigation.jsx';
import Logo from './components/Logo/Logo.jsx';
import Ranks from './components/Ranks/Ranks.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.jsx';
import './App.css';

// const app = new Clarifai.App({
//  apiKey: '9eedcc0643464daf8490030de1571f63'
// });


function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const onInputChange = (e) => {
    setInput(e.target.value);
  }
  const onButtonSubmit = () => {
    setImageUrl(input);
    // app.models.predict(Clarifai.FACE_DETECT_MODEL, 'https://sample.clarifai.com/face-det.jpg').then(
    //   function(response){
    //     console.log(response);
    //   },
    //   function(err){
    //     console.log(err);
    //   }
    // );


    // Resource for the docs and solution : https://docs.clarifai.com/api-guide/predict/images/

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
        .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
        .catch(error => console.log('error', error));
    
  }

  return (
    <div className="App">
      <ParticlesBg type="circle" bg={true} />
      <Navigation />
      <Logo />
      <Ranks />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
}

export default App;
