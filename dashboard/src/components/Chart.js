import React, { useEffect, useState } from 'react';
import '../assets/css/product.css'


function Chart (){
    const [allProducts, setProducts] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:8080/api/products')
        .then(res => res.json())
        .then(allProducts =>{
            setProducts(allProducts.products)
        })
    }, [])
    return (
        <section className="featured-products">
        <h1 className="section-title">Todos nuestros productos</h1>
        <br/>
        <br/>
        <br/>
        { allProducts.map((product, i)=> {
            return <div className="product" key={i}>
              <img src={`../images/${product.image}`} alt="" />
              <p>{product.name}</p>
              <p className="product-price">{product.price}</p>
          </div>
        })
        
        }
      </section>

    )
}

export default Chart;