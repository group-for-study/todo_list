import logo from "../../images/group_logo.jpg";
import "../../styles/App.css";

function Header() {
  return (
    <>
      <header className="App-header">
        <div className="App-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="App-description">
          <p>To Do List</p>
        </div>
        <div className="App-link">
          <a
            // className="App-link"
            href="https://github.com/orgs/group-for-study/repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Repository
          </a>
        </div>
      </header>
    </>
  );
}

export default Header;
