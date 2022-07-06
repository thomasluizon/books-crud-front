import Button from '../Button/Button';

export default props => {
	return (
		<header className="header">
			<h1>Books Crud</h1>
			<div className="header__btn-wrapper">
				<Button>Add Book</Button>
				<Button>Add Author</Button>
			</div>
		</header>
	);
};
