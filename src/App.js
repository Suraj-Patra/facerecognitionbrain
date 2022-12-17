import Navigation from './components/Navigation/Navigation.jsx';
import Logo from './components/Logo/Logo.jsx';
import Ranks from './components/Ranks/Ranks.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import './App.css';
import ParticlesBg from 'particles-bg';


function App() {
  return (
    <div className="App">
      <ParticlesBg type="circle" bg={true} />
      <Navigation />
      <Logo />
      <Ranks />
      <ImageLinkForm />
      {/*<FaceRecognition />*/}
    </div>
  );
}

export default App;
