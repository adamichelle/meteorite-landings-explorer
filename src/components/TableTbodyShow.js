import React from 'react';
import debounce from 'lodash.debounce';
import TableTbody from './TableTbody';

// const meteoriteExplorerAppToken = process.env.REACT_APP_SOCRATA_APP_TOKEN;
const meteoriteExplorerAppToken = REACT_APP_SOCRATA_APP_TOKEN;
const apiUrl = `https://data.nasa.gov/resource/gh4g-9sfh.json?`;

class TableTbodyShow extends React.Component {
    constructor(props) {
        super(props);

        // Sets up our initial state
        this.state = {
            error: null,
            isLoading: false,
            meteorites: [],
            limit: 200,
            offset: 0
        };

        this.loadMeteorites = this.loadMeteorites.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.loadMeteorites();
        this.handleScroll();
    }

    handleScroll = () => {
        
        // Binds our scroll event handler
        this.refs.iScroll.onScroll = debounce(() => {
            console.log('yay!')
            console.log('scrolling..')
            const {
            loadMeteorites,
            state: {
                error,
                isLoading,
            },
            } = this;
    
            // Bails early if:
            // * there's an error
            // * it's already loading
            // * there's nothing left to load
            if (error || isLoading) return;
    
            console.log(this.refs.iScroll.scrollHeight, this.refs.iScroll.scrollTop, this.refs.iScroll.clientHeight);
            // Checks that the page has scrolled to the bottom
            if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight) {
                    loadMeteorites();
            }
        }, 100);
    }

    loadMeteorites = () => {
        let queryUrl;
        if(this.props !== "isASearch") {
            queryUrl = `${apiUrl}$offset=${this.state.offset}&$limit=${this.state.limit}`
        }

        this.setState({isLoading: true}, () => {
            fetch(queryUrl, {
                headers: {
                  'X-App-Token': meteoriteExplorerAppToken
                }
            })
            .then(res => res.json())
            .then(
                (data) => {
                    let newOffset = this.state.offset + this.state.limit;
                    this.setState({
                      isLoading: false,
                      offset: newOffset,        
                      meteorites: [...this.state.meteorites, ...data]
                    });
                },
                (error) => {
                    this.setState({
                      error,
                      isLoading: false
                    });
                }
            )
        })
    }

    render() {
        const { error, isLoading, meteorites } = this.state;

        if(error) {
            return(
                <tbody style={{ color: '#900' }}>
                    <tr>
                        <td>{error.message}</td>
                    </tr>
                </tbody>
            )
        } else if(isLoading) {
            return(
                <tbody>
                    <tr>
                        <td>No Results</td>
                    </tr>
                </tbody>
            )
        } else {
            return(
                <TableTbody ref="iScroll" isASearch={this.props.isASearch} isMobile={this.props.isMobile} content={meteorites}/>      
            )
        }
    }  
}

export default TableTbodyShow;
