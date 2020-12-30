import './App.scss';
import JoplinNotebooks from './main/JoplinNotebooks'

function App() {
  return (
    <div className="App">
      <header>
        <h1>AniList to Joplin Backup Tool</h1>
        <h4>Easy-to-use for non-programmers</h4>
        <p>Joplin will occasionally create duplicates of the posts. In that case, delete all notes, go to the "conflicts" notebook and delete all the ones there as well. This is caused by the syncing tool in Joplin.</p>
      </header>
      <main>
        <JoplinNotebooks />
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
