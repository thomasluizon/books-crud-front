import { useEffect, useState } from 'react';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Table from './components/Table/Table';
import Edit from './components/Edit/Edit';

async function fetchApi(url, obj = {}) {
	const res = await fetch(url, obj);
	const json = await res.json();
	return json;
}

function App() {
	const [data, setData] = useState([]);
	const [value, setValue] = useState('');
	const [regex, setRegex] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editingState, setEditingState] = useState('');
	const [actualBook, setActualBook] = useState(false);
	const [authors, setAuthors] = useState([]);

	const url = 'https://books-crud-back.herokuapp.com';

	async function getBooks() {
		const data = await fetchApi(url + '/books');
		setData(data);
	}

	async function getAuthors() {
		const data = await fetchApi(url + '/authors');
		setAuthors(data);
	}

	useEffect(() => {
		getBooks();
		getAuthors();
	}, []);

	const handleSearch = event => {
		const inputValue = event.target.value;
		setValue(inputValue);
		let regex = new RegExp(inputValue, 'gi');

		if (inputValue === '') regex = false;
		setRegex(regex);
	};

	const handleCreate = type => {
		setActualBook(false);
		setEditingState('create');
		if (type === 'author') setEditingState('createAuthor');

		setIsEditing(true);
	};

	const handleClickEdit = book => {
		setActualBook(book);
		setEditingState('editing');
		setIsEditing(true);
	};

	const handleDelete = async id => {
		await fetch(url + `/books/${id}`, { method: 'DELETE' });

		getBooks();
		getAuthors();
	};

	function checkIfInputIsNumber(value) {
		return parseInt(value) + 1 === parseInt(value) + 1;
	}

	const handleSave = async (book, event) => {
		event.preventDefault();
		if (
			!checkIfInputIsNumber(book.price) ||
			!checkIfInputIsNumber(book.quantity)
		) {
			alert('Wrong price or quantity');
			return;
		}

		let res;
		if (editingState === 'create') {
			const obj = {
				name: book.name,
				price: parseInt(book.price),
				quantity: parseInt(book.quantity),
				gender: book.gender,
				authorName: book.authorName,
			};

			console.log(obj);

			res = await fetch(url + '/books', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(obj),
			});
		}

		if (res.ok) {
			setIsEditing(false);
			getBooks();
		} else {
			alert(`${res.status}: ${res.statusText}`);
		}
	};

	return (
		<>
			<Container>
				{!isEditing ? (
					<>
						<Header handleCreate={handleCreate} />
						<Search value={value} handleSearch={handleSearch} />
						<Table
							data={data}
							regex={regex}
							handleClickEdit={handleClickEdit}
							handleDelete={handleDelete}
						/>
					</>
				) : (
					<Edit
						actualBook={actualBook}
						editingState={editingState}
						setIsEditing={setIsEditing}
						handleSave={handleSave}
						authors={authors}
					/>
				)}
			</Container>
		</>
	);
}

export default App;
