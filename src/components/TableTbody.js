import React, { Fragment } from 'react';
import debounce from 'lodash.debounce';

const meteoriteExplorerAppToken = process.env.REACT_APP_SOCRATA_APP_TOKEN;
const apiUrl = `https://data.nasa.gov/resource/gh4g-9sfh.json?`;

const getTruncatedMass = (mass) => {
  return mass ? 
  (mass.indexOf('.') !== -1 ? 
  (mass.indexOf('.') >=1 ? 
  (mass.length > 6 ? 
  (mass.slice(mass.indexOf('.'), 8) ? 
  `~${mass.slice(0, mass.indexOf('.'))}${mass.slice(mass.indexOf('.'), 8)}` : 
  mass) : 
  mass) : 
  mass) : 
  mass) : 
  mass;
}

class TableTbody extends React.Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: null,
      isLoading: false,
      meteorites: [],
      limit: 500,
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
    console.log(this.refs)
    // Binds our scroll event handler
    this.refs.iScroll.onscroll = debounce(() => {
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
      .then((data) => {
        const nextMeteorites = data.map(meteorite => ({
          name: meteorite.name,
          id: meteorite.id,
          nametype: meteorite.nametype,
          recclass: meteorite.recclass,
          mass: meteorite.mass,
          fall: meteorite.fall,
          year: meteorite.year,
          reclat: meteorite.reclat,
          reclong: meteorite.reclong,
          geolocation: meteorite.geolocation
        }));

        let newOffset = this.state.offset + this.state.limit;
        this.setState({
          isLoading: false,
          offset: newOffset,        
          meteorites: [...this.state.meteorites, ...nextMeteorites]
        });
      },
      (error) => {
        this.setState({
          error,
          isLoading: false
        });
      }
      )
    });
  }

  render() {
    const { error, isLoading, meteorites, offset } = this.state;
    if(this.props.isASearch) {
      console.log('coming soon..')
    }
    else {
      if(this.props.isMobile) {
        return(
          <tbody ref="iScroll">
            <tr className="search-results-number-tr">
              <td colSpan="9" className="search-results-number text-center text-white">Showing {offset} of 45716</td>
            </tr>
            {meteorites.map((meteorite, id) => (
              <tr key={id}>
                <th>Name</th><td>{meteorite.name}</td>
                <th>Id</th><td>{meteorite.id}</td>
                <th>Type</th><td>{meteorite.nametype}</td>
                <th>RecClass</th><td>{meteorite.recclass}</td>
                <th>Mass</th><td>{meteorite.mass}</td>
                <th>Fall</th><td>{meteorite.fall}</td>
                <th>Year</th><td>{meteorite.year ? meteorite.year.substr(0,4) : meteorite.year}</td>
                <th>Latitude</th><td>{meteorite.geolocation ? meteorite.geolocation.latitude : meteorite.reclat}</td>
                <th>Longitude</th><td>{meteorite.geolocation ? meteorite.geolocation.longitude : meteorite.reclong}</td>
              </tr>
            ))}
            {error &&
              <tr style={{ color: '#900' }}>
                <td colSpan="9" className="message text-center">{error.message}</td>
              </tr>
            }
            {isLoading &&
              <tr><td colSpan="9" className="message text-center">Loading...</td></tr>
            }
          </tbody>
        )
      }
      else {
        return(
          <tbody ref="iScroll">
            <tr className="search-results-number-tr">
              <td className="search-results-number text-center text-white">Showing {offset} of 45716</td>
            </tr>
            {meteorites.map((meteorite, id) => (
              <tr key={id}>
                <td>{meteorite.name}</td>
                <td>{meteorite.id}</td>
                <td>{meteorite.nametype}</td>
                <td>{meteorite.recclass}</td>
                <td>{getTruncatedMass(meteorite.mass)}</td>
                <td>{meteorite.fall}</td>
                <td>{meteorite.year ? meteorite.year.substr(0,4) : meteorite.year}</td>
                <td>{meteorite.geolocation ? meteorite.geolocation.latitude : meteorite.reclat}</td>
                <td>{meteorite.geolocation ? meteorite.geolocation.longitude : meteorite.reclong}</td>
              </tr>
            ))}
            {error &&
              <tr style={{ color: '#900' }}>
                <td colSpan="9" className="message text-center">{error.message}</td>
              </tr>
            }
            {isLoading &&
                <tr><td colSpan="9" className="message text-center">Loading...</td></tr>
            }
            <Fragment>
              
            </Fragment>
          </tbody>
        )
      }
    }
  }
}

export default TableTbody;