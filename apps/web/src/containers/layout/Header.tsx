import logo from 'assets/images/group_logo.jpg';
import style from './Header.module.scss';

function Header() {
  return (
    <>
      <header className={style.header}>
        <div className={style.logo}>
          <img src={logo} alt="logo" />
        </div>
        <p className={style.description}>TODO LIST</p>
        <a
          className={style.link}
          href="https://github.com/orgs/group-for-study/repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </header>
    </>
  );
}

export default Header;
