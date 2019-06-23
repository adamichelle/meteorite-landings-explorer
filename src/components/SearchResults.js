import React from 'react';
import withSizes from 'react-sizes';
// import TableMobile from './TableMobile';
// import TableDesktop from './TableDesktop';

class SearchResults extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isSearchResults: false
        }
    }

    render() {
        return(
            <div className="col-12 col-sm-11 col-md-10 col-lg-10 search-results">
                <div className="search-results-number p-2 text-center text-white" id="searchResultsNumber">Showing 15 of 1500 results</div>
                {/* {this.props.isMobile ? <TableMobile isASearch={this.props.isASearch} isMobile={this.props.isMobile} /> : <TableDesktop isASearch={this.props.isASearch} isMobile={this.props.isMobile} />} */}
            </div>
        )
    }
}

const mapSizesToProps = ({width}) => ({
    isMobile: width < 768
})

export default withSizes(mapSizesToProps)(SearchResults);