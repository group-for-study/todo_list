import Header from 'containers/layout/Header';
import TodoList from 'containers/todoList/TodoList';
import 'assets/styles/global.scss';

function App() {
  return (
    <div className="back_ground">
      <div className="App">
        <Header />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
