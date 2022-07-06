export default props => {
	const { data } = props;
	const columns = [
		'ID',
		'Name',
		'Price',
		'Quantity',
		'Gender',
		'Author',
		'Actions',
	];

	return (
		<table className="table">
			<thead>
				<tr>
					{columns.map(column => (
						<th>{column}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map(book => {
					return (
						<tr key={book.id}>
							<td data-label={columns[0]}>{book.id}</td>
							<td data-label={columns[1]}>{book.name}</td>
							<td data-label={columns[2]}>{book.price}</td>
							<td data-label={columns[3]}>{book.quantity}</td>
							<td data-label={columns[4]}>{book.gender}</td>
							<td data-label={columns[5]}>{book.authorName}</td>
							<td data-label={columns[6]}>
								<button>
									<i className="bi bi-pencil-square"></i>
								</button>
								<button>
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
