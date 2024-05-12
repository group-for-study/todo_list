import Header from './Header';
import TodoList from '../../components/TodoList';

function App() {
  return (
    <div className="App">
      < Header/>
      <div className='App-Body'>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
