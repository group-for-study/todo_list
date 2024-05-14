import Header from './containers/layout/Header';
import TodoList from './pages/todoList/TodoList';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-Body">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
