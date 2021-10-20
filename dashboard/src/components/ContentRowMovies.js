import React, { useEffect, useState } from 'react';
import SmallCard from './SmallCard';

function ContentRowMovies(){
    const [productos, setProductos] = useState([]); 

    useEffect(() =>{
        Promise.all(
            [fetch('http://localhost:8080/api/products').then(res => res.json()),
             fetch('http://localhost:8080/api/users').then(res => res.json())])
        .then(([products, users]) =>{
            let cards = []
            let productosQuantity = {
                title: 'Todos los productos',
                color: 'primary',
                cuantity: products.count,
                icon: 'fa-clipboard-list'
            }
            let categoryQuantity = {
                title: 'Todas las categorias',
                color: 'success',
                cuantity: products.countByCategory.length,
                icon: 'fas fa-book-open'
            }
            let UserQuantity = {
                title: 'Todos los usuarios',
                color: 'warning',
                cuantity: users.count,
                icon: 'fas fa-users'
            }
            cards.push(productosQuantity)
            cards.push(UserQuantity)
            cards.push(categoryQuantity)
            setProductos(cards)

        })
    }, [])

    return (
        <div className="row">
            {productos.length === 0 && <p>Cargando</p>}
            {productos.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowMovies;