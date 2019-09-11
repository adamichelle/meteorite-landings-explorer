import React from 'react';
import TableTbody from './TableTbody';

class TableDesktop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false
        }
    }

    render() {
        return(
            <table className="table table-sm search-results-table-mobile" id="searchResultsTable">
               <TableTbody isASearch={this.props.isASearch} isMobile={this.props.isMobile}/>
            </table>
        );
    }
}

export default TableDesktop;