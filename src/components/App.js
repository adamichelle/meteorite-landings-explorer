import React, {Component, Fragment} from 'react';
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app-root">
        <Header />
        <main>
          <section>
            <div className="container-fluid">
              <div className="row justify-content-center pt-1">
                <SearchPanel />
                <SearchResults isASearch={this.state.isASearch} />
              </div>
            </div>
          </section>
        </main>

        <footer>
          <p className="text-center">Made with ❤ by Adaobi Aniuchi &copy; 2019.</p>
        </footer>
      </div>
    );
  }
}

export default App;
