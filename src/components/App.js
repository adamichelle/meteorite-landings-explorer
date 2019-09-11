import React from 'react';
import '../App.css';
import Header from "./Header";
import SearchPanel from "./SearchPanel";
import SearchResults from "./SearchResults";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isASearch: false
    }
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
