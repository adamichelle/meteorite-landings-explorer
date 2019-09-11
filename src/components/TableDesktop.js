import React from 'react';
import TableTbody from './TableTbody';


class TableDesktop extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <table className="table table-sm search-results-table desktop" id="searchResultsTable">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Id</th>
                        <th scope="col">Type</th>
                        <th scope="col">RecClass</th>
                        <th scope="col">Mass</th>
                        <th scope="col">Fall</th>
                        <th scope="col">Year</th>
                        <th scope="col" aria-label="Latitude">Lat</th>
                        <th scope="col" aria-label="Longitude">Long</th>
                    </tr>
                </thead>
                <TableTbody isASearch={this.props.isASearch} isMobile={this.props.isMobile}/>
            </table>
        );
    }
}

export default TableDesktop;