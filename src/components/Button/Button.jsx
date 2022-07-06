export default props => {
	return (
		<button
			type={props.type || 'button'}
			onClick={props.onClick}
			className="btn"
		>
			{props.children}
		</button>
	);
};
