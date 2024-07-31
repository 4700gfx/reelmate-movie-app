import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import MovieList from './components/MovieList';



function App() {
  return (
    <div className='App'>
      <div className='app-container'>
      <Navbar></Navbar>
      <section className='main-container'>
      <Main></Main>
      <MovieList></MovieList>
      </section>
      </div>
    </div>
  );
}

export default App;
