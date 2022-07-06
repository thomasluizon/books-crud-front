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
	const [actualAuthor, setActualAuthor] = useState(false);
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
		setActualAuthor(false);
		setEditingState('create');
		if (type === 'author') setEditingState('createAuthor');

		setIsEditing(true);
	};

	const handleClickEdit = book => {
		setActualBook(book);
		setEditingState('editingBook');
		setIsEditing(true);
	};

	const handleDelete = async (id, type, event) => {
		if (event) event.preventDefault();

		const res = await fetch(url + `/${type}/${id}`, { method: 'DELETE' });

		if (res.ok) {
			setIsEditing(false);
			getBooks();
			getAuthors();
		} else {
			alert(`${res.status}: ${res.statusText}`);
		}
	};

	function checkIfInputIsNumber(value) {
		return parseInt(value) + 1 === parseInt(value) + 1;
	}

	const handleSave = async (payload, event) => {
		event.preventDefault();

		let res;

		if (editingState === 'create') {
			if (
				!checkIfInputIsNumber(payload.price) ||
				!checkIfInputIsNumber(payload.quantity)
			) {
				alert('Wrong price or quantity');
				return;
			}

			const obj = {
				name: payload.name,
				price: parseInt(payload.price),
				quantity: parseInt(payload.quantity),
				gender: payload.gender,
				authorName: payload.authorName,
			};

			res = await fetch(url + '/books', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(obj),
			});
		}

		if (editingState === 'createAuthor') {
			const obj = {
				name: payload.name,
			};

			res = await fetch(url + '/authors', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(obj),
			});
		}

		if (editingState === 'editingBook') {
			if (
				!checkIfInputIsNumber(payload.price) ||
				!checkIfInputIsNumber(payload.quantity)
			) {
				alert('Wrong price or quantity');
				return;
			}

			const obj = {
				name: payload.name,
				price: parseInt(payload.price),
				quantity: parseInt(payload.quantity),
				gender: payload.gender,
				authorName: payload.authorName,
			};

			res = await fetch(url + `/books/${payload.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(obj),
			});
		}

		if (editingState === 'editingAuthor') {
			const obj = {
				name: payload.name,
			};

			res = await fetch(url + `/authors/${payload.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(obj),
			});
		}

		if (res.ok) {
			setIsEditing(false);
			getBooks();
			getAuthors();
		} else {
			alert(`${res.status}: ${res.statusText}`);
		}
	};

	const handleAuthorChange = (id, name) => {
		setActualAuthor({ id, name });
		setEditingState('editingAuthor');
		setIsEditing(true);
	};

	const handleDeleteAuthor = () => {
		setEditingState('deleteAuthor');
		setIsEditing(true);
	};

	return (
		<>
			<Container>
				{!isEditing ? (
					<>
						<Header
							handleDeleteAuthor={handleDeleteAuthor}
							handleCreate={handleCreate}
						/>
						<Search value={value} handleSearch={handleSearch} />
						<Table
							data={data}
							regex={regex}
							handleClickEdit={handleClickEdit}
							handleDelete={handleDelete}
							handleAuthorChange={handleAuthorChange}
						/>
					</>
				) : (
					<Edit
						actualBook={actualBook}
						setActualBook={setActualBook}
						setActualAuthor={setActualAuthor}
						actualAuthor={actualAuthor}
						editingState={editingState}
						setIsEditing={setIsEditing}
						handleSave={handleSave}
						authors={authors}
						handleDelete={handleDelete}
					/>
				)}
			</Container>
		</>
	);
}

export default App;
