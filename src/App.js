import './App.css';
import Axios from 'axios';
import { useState } from 'react';
import { KEYS, ID } from './keys.js';
import Recipe from './components/Recipe';
import { v4 } from 'uuid';
import Alert from './components/Alert';

function App() {
	const [query, setQuery] = useState('');
	const [recipes, setRecipes] = useState([]);
	const [alert, setAlert] = useState('');

	const url = `https://api.edamam.com/api/recipes/v2/?&app_id=${ID}&app_key=${KEYS}&type=public&q=${query}`;

	const getData = async () => {
		try {
			if (query !== '') {
				const result = await Axios.get(url);

				if (!result.data.count) {
					return setAlert('NO RECIPES FOUND');
				}
				setRecipes(result.data.hits);
				console.log(result);
				setAlert('');
				setQuery('');
			} else {
				setAlert('Please fill the form');
			}
		} catch (err) {
			setAlert(err.message);
		}
	};

	const submitHandler = e => {
		e.preventDefault();
		getData();
	};

	return (
		<div className='App'>
			<h1 onClick={getData}>Food Searching App</h1>
			<form className='search-form' onSubmit={submitHandler}>
				{alert !== '' && <Alert alert={alert} />}
				<input
					type='text'
					placeholder='Search Food'
					autoComplete='off'
					onChange={e => setQuery(e.target.value)}
					value={query}
				/>
				<input type='submit' value='search' />
			</form>
			<div className='recipes'>{recipes !== [] && recipes.map(recipe => <Recipe recipe={recipe} key={v4()} />)}</div>
		</div>
	);
}

export default App;
