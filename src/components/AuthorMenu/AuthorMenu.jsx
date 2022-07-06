import { useEffect, useState, useRef } from 'react';

export default props => {
	const [menuOpen, setMenuOpen] = useState(false);
	const button = useRef(null);

	return (
		<div className="author-menu">
			<label htmlFor={props.label.toLowerCase()}>{props.label}</label>
			<button
				ref={button}
				type="button"
				onClick={() => setMenuOpen(!menuOpen)}
			>
				<span>{props.selectedAuthor}</span>
				<i className="bi bi-arrow-down"></i>
			</button>
			{menuOpen && (
				<nav>
					<ul>
						{props.authors.map(author => {
							return (
								<li
									onClick={() => {
										props.setAuthor(author.name);
										setMenuOpen(false);
									}}
									key={author.id}
								>
									{author.name}
								</li>
							);
						})}
					</ul>
				</nav>
			)}
		</div>
	);
};
