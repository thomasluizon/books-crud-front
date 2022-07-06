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
	const url = 'https://books-crud-back.herokuapp.com';

	useEffect(() => {
		(async () => {
			const data = await fetchApi(url + '/books');
			setData(data);
		})();
	}, []);

	return (
		<>
			<Container>
				<Header />
				<Search />
				<Table data={data} />
			</Container>
		</>
	);
}

export default App;
