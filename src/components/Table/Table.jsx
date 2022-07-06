export default props => {
	const { data } = props;

	return (
		<table className="table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Price</th>
					<th>Quantity</th>
					<th>Gender</th>
					<th>Author</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{data.map(book => {
					return (
						<tr key={book.id}>
							<td data-label="ID">{book.id}</td>
							<td data-label="Name">{book.name}</td>
							<td data-label="Price">{book.price}</td>
							<td data-label="Quantity">{book.quantity}</td>
							<td data-label="Gender">{book.gender}</td>
							<td data-label="Author">{book.authorName}</td>
							<td data-label="Actions">
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
