import Button from '../Button/Button';

export default props => {
	return (
		<header className="header">
			<h1>Books Crud</h1>
			<div className="header__btn-wrapper">
				<Button onClick={() => props.handleCreate('book')}>Add Book</Button>
				<Button onClick={() => props.handleCreate('author')}>
					Add Author
				</Button>
			</div>
		</header>
	);
};
