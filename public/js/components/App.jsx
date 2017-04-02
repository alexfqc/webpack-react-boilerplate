import React from 'react';
import { IndexLink, Link } from 'react-router';
import '../../scss/menu.scss';

const App = ({ children }) => (
  <div>
    <div className="menu-container">
      <ul className="menu-container-ul">
        <li className="menu-container-li">
          <IndexLink className="menu-container-li-a" to="/">Main</IndexLink>
        </li>
        <li className="menu-container-li">
          <Link className="menu-container-li-a" to="/other">Other</Link>
        </li>
      </ul>
    </div>
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default App;
