import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './Home';
import Race from './Race';
import Rogue from './Rogue';
import Options from './Options';

import styles from "./menu.module.css"

const Menu = () => {
  return (
    <Router>
      <div >
        <nav className={styles.navbar}>
          <ul className={styles.linklist}>
            <li className={styles.link}><Link className={styles.a} to="/">Home</Link></li>
            <li className={styles.link}><Link  className={styles.a} to="/race">Race</Link></li>
            <li className={styles.link}><Link  className={styles.a} to="/rogue">Rogue</Link></li>
            <li className={styles.link}><Link className={styles.a} to="/options">Options</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/race" Component={Race} />
          <Route path="/rogue" Component={Rogue} />
          <Route path="/options" Component={Options} />
        </Routes>
      </div>
    </Router>
  );
};

export default Menu
