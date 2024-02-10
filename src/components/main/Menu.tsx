import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Race from './Race';
import Rogue from './Rogue';
import Options from './Options';

const Menu = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Menu</Link></li>
            <li><Link to="/race">Race</Link></li>
            <li><Link to="/rogue">Rogue</Link></li>
            <li><Link to="/options">Options</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/race" Component={Race} />
          <Route path="/rogue" Component={Rogue} />
          <Route path="/options" Component={Options} />
        </Routes>
      </div>
    </Router>
  );
};

export default Menu
