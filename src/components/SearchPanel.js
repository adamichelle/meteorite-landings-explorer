import React from 'react';

class SearchPanel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }
    }

    onChange = (event) => {
        this.setState({searchTerm: event.target.value})
    }

    render() {
        return(
            <div className="col-12 col-sm-11 col-md-10 col-lg-10 search-panel">
                <form>
                    <small id="searchHelp" className="form-text text-muted text-center">Tip: Search using the name of the meteorite</small>
                    <div className="input-group input-group-lg">
                        <input
                        type="text"
                        className="form-control"
                        id="searchTerm"
                        name="search-term"
                        value={this.state.searchTerm}
                        placeholder={"Enter a search term"}
                        onChange={this.onChange}
                        aria-label="Meteorite"
                        aria-describedby="search"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-search" type="button" id="Search">Search</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }  
}

export default SearchPanel;