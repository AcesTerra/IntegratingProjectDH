import React, { useEffect, useState } from 'react';

import LastMovieInDb from './LastMovieInDb';
import GenresInDb from './GenresInDb';

function ContentRowCenter(){
    const [lastItem, setLastItem] = useState([])
    useEffect(()=>{
        fetch('http://localhost:8080/api/products')
        .then(res => res.json())
        .then(data =>{
            // console.log(data.products.splice(-1)[0])
            setLastItem(data.products.splice(-1)[0])
        })
    }, [])

    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            {lastItem.length === 0  && <p>Cargando</p>}

            <LastMovieInDb {...lastItem} />

            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <GenresInDb />

        </div>
    )
}

export default ContentRowCenter;