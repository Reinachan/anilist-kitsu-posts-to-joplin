import react from 'react';

import AniListForm from './main/AniListForm';
import JoplinNotebooks from './main/JoplinNotebooks';

import './styles/App.scss';

function App() {
	return (
		<div className='app'>
			<header className='header'>
				<h1>AniList to Joplin Backup Tool</h1>
				<h2>Easy-to-use for non-programmers</h2>
				<p>
					Joplin will occasionally create duplicates of the posts. In that case, delete all notes,
					go to the "conflicts" notebook and delete all the ones there as well. This is caused by
					the syncing tool in Joplin.
				</p>
			</header>
			<main className='main'>
				<AniListForm />
				<JoplinNotebooks />
			</main>
			<footer className='footer'>
				<p>Developed by @Reina</p>
			</footer>
		</div>
	);
}

export default App;
