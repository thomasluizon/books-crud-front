import { useState } from 'react';
import { useEffect } from 'react';

export default props => {
	const { regex, data } = props;
	const [filteredData, setFilteredData] = useState(data);

	const columns = [
		'ID',
		'Name',
		'Price',
		'Quantity',
		'Genre',
		'Author',
		'Actions',
	];

	useEffect(() => {
		if (!regex) setFilteredData(data);
		if (regex) {
			const filteredArr = data.filter(
				book =>
					book.name.match(regex) ||
					book.authorName.match(regex) ||
					book.id.toString().match(regex) ||
					book.gender.match(regex)
			);
			setFilteredData(filteredArr);
		}
	}, [regex, data]);

	return (
		<table className="table">
			<thead>
				<tr>
					{columns.map((column, i) => (
						<th key={i}>{column}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{filteredData.map(book => {
					return (
						<tr className="overflow-table" key={book.id}>
							<td data-label={columns[0]}>{book.id}</td>
							<td data-label={columns[1]}>{book.name}</td>
							<td data-label={columns[2]}>{book.price}</td>
							<td data-label={columns[3]}>{book.quantity}</td>
							<td data-label={columns[4]}>{book.gender}</td>
							<td
								data-label={columns[5]}
								style={{ cursor: 'pointer' }}
								onClick={() =>
									props.handleAuthorChange(
										book.author_id,
										book.authorName
									)
								}
							>
								{book.authorName}
							</td>
							<td data-label={columns[6]}>
								<button onClick={() => props.handleClickEdit(book)}>
									<i className="bi bi-pencil-square"></i>
								</button>
								<button
									onClick={() => props.handleDelete(book.id, 'books')}
								>
									<i className="bi bi-x-circle"></i>
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
