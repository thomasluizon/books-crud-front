import { useState } from 'react';

export default props => {
	return (
		<div className="search">
			<i className="bi bi-search"></i>
			<input type="text" value={props.value} onChange={props.handleSearch} />
		</div>
	);
};
