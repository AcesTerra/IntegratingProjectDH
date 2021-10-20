import React, { useEffect, useState } from "react";

function GenresInDb() {
  const [category, setCategory] = useState([])

  useEffect(()=>{
    fetch('http://localhost:8080/api/products')
    .then(res => res.json())
    .then(data =>{
      // console.log(data.countByCategory)
      setCategory(data.countByCategory)
    })
  }, [])

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Categorias en la Base de Datos
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {category.length ===0 && <p>Cargando</p>}
            { category.map((c, i) => {
              return <div className="col-lg-6 mb-4" key={i}>
              <div className="card bg-dark text-white shadow">
                <div className="card-body" >{c.name} <br/>Total {c.count}</div>
                
              </div>
            </div>
            })
            }
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenresInDb;
