import React from 'react';
import imagenFondo from '../assets/images/mandalorian.jpg';
import PropTypes from 'prop-types';


function LastMovieInDb(props){
    return(
        
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Ultimo producto agregado</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={`../images/${props.image}`} alt=" Star Wars - Mandalorian "/>
                    </div>
                    <p>{props.name}</p>
                    <p>{props.description}</p>
                    {/* <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a> */}
                </div>
            </div>
        </div>
    )
}

LastMovieInDb.defaultProps = {
    name: 'No nombre',
    description: 'No description'
}

/* PROPTYPES */

LastMovieInDb.propTypes = {
    atritutes: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })
}


export default LastMovieInDb;
