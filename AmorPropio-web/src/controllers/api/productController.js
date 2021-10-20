const db = require('../../database/models')

const controller =  {
    list: (req, res) =>{
        db.Products.findAll()
        .then(allproducts =>{
            let home = 0;
            let featured = 0
            let recomendation = 0;

            let products = []
            allproducts.forEach(p =>{
                //Count categories
                switch(p.id_category){
                    case 1:
                        home += 1
                        break;
                    case 2:
                        featured += 1
                        break;
                    case 3:
                        recomendation += 1
                        break;
                    default:
                        break;
                }

                let product = {
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    detail: '/api/products/' + p.id,
                    image: p.image,
                    price: p.price
                }
                products.push(product)          
            });

            res.json({
                count: allproducts.length,
                countByCategory: [
                    {   
                        name: 'Inicio',
                        count: home
                    },
                    {   
                        name: 'Destacados',
                        count: featured
                    },
                    {   
                        name: 'Recomendados',
                        count: recomendation
                    }
                ],
                products

            })
        })
    },
    detail: (req, res) =>{
        db.Products.findByPk(req.params.id,{
            include: [{all: true}]
        })
        .then(product =>{

            // let  user  = {
            //     id: product.users.id,
            //     name: product.users.name + product.users.lastName,
            //     email: product.users.email
            // }


            let produkt = {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                colors: product.colors,
                relations:[
                    {
                        category: product.category,
                        
                    }
                ],
                image: product.image
            }
            res.json({
                product: produkt
            })
        })
        .catch(e => console.log(e))
    }
}

module.exports = controller;