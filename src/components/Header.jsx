import React from 'react';

const Header = () => {
    return(
        <header>
          <nav className="navbar navbar-dark navbar-expand-md">
            <a className="navbar-brand" href="/">Meteorite Landings Explorer</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <button className="btn btn-light btn-help" aria-label="Help">?</button>
                </li>
              </ul>
            </div>
          </nav>
        </header>
    )
}

export default Header;