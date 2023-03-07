import React from 'react';

const Alert = props => {
	return (
		<div className='alert'>
			<h3>{props.alert}</h3>
		</div>
	);
};

export default Alert;
