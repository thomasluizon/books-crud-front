export default props => {
	return (
		<div className="edit-input">
			<label htmlFor={props.label.toLowerCase()}>{props.label}</label>
			<input
				type="text"
				id={props.label.toLowerCase()}
				value={props.value}
				onChange={e => props.setValue(e.target.value)}
				readOnly={props.readOnly}
				required
			/>
		</div>
	);
};
