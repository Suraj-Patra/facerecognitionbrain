import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.jpg';

const Logo = () => {
	return(
		<>
			<div className='ma4 mt0'>
				<Tilt tiltMaxAngleY={10} >
			      <div className='Tilt'>
			      	<img src={brain} alt='logo' />
			      </div>
			    </Tilt>
			</div>
		</>
	);
}

export default Logo;