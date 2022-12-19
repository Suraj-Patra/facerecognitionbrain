import './FaceRecognition.css';

const FaceRecognition = (props) => {
	const { imageUrl, box } = props;
	const {leftCol, topRow, rightCol, bottomRow} = box;

	return(
		<>
			<div className='center ma'>
				<div className='absolute mt2'>
					<img id='inputImage' src={imageUrl} alt='face-detection' width='500px' height='auto' />
					<div className='bounding-box' style={{top: topRow, right: rightCol, bottom: bottomRow, left: leftCol}}></div>
				</div>
			</div>	
		</>
	);
}

export default FaceRecognition;