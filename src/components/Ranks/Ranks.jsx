const Ranks = (props) => {

	const { name, entries } = props;

	return(
		<>
			<div className='white f3'>
				{`${name}, your current entry count is...`}
			</div>
			<div className='white f1'>
				{`${entries}`}
			</div>
		</>
	);
}

export default Ranks;