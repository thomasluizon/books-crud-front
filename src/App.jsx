import { useEffect, useState } from 'react';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Table from './components/Table/Table';

async function fetchApi(url, obj = {}) {
	const res = await fetch(url, obj);
	const json = await res.json();
	return json;
}

function App() {
	const [data, setData] = useState([]);
	const [value, setValue] = useState('');
	const [regex, setRegex] = useState(false);

	const url = 'https://books-crud-back.herokuapp.com';

	useEffect(() => {
		(async () => {
			const data = await fetchApi(url + '/books');
			setData(data);
		})();
	}, []);

	const handleSearch = event => {
		const inputValue = event.target.value;
		setValue(inputValue);
		let regex = new RegExp(inputValue, 'gi');

		if (inputValue === '') regex = false;
		setRegex(regex);
	};

	return (
		<>
			<Container>
				<Header />
				<Search value={value} handleSearch={handleSearch} />
				<Table data={data} regex={regex} />
			</Container>
		</>
	);
}

export default App;
