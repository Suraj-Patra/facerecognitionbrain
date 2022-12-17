import './ImageLinkForm.css';

const ImageLinkForm = () => {
	return(
		<>
			<p className='f3'>
				{'This magic brain will detect faces in your pictures. Get it a try.'}
			</p>
			<div className='center detect pa4 br3 shadow-5'>
				<input type='text' className='f4 pa2 w-70 center' />
				<button className='f4 w-30 grow link ph3 pv2 div white bg-light-purple'>Detect</button>
			</div>
		</>
	);
}

export default ImageLinkForm;