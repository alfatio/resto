const { Product } = require('../models')
const axios = require('axios').default

class Controller {

  static async getProducts(req,res) {
    let limit = req.query.limit
    let page = req.query.page
    let category = req.query.category
    try {
      let option = {
        order: [['id','DESC']]
      }
      const products = await Product.findAll(option)
      if(products.length < 1){
        console.log('masuk axios');
        const { data } = await axios.get('https://portal.panelo.co/paneloresto/api/productlist/18')
        const newProducts = []
        const dataProduct = data.products
        for(let i = 0; i < dataProduct.length; i++) {
          const dataProduct2 = dataProduct[i].products
          for(let j = 0; j < dataProduct2.length; j++) {
            let obj = {
              category : dataProduct[i].name
            }
            obj.name = dataProduct2[j].title
            obj.slug = dataProduct2[j].slug
            obj.price = dataProduct2[j].price.price
            obj.img_url = dataProduct2[j].preview.content
            obj.stock = dataProduct2[j].stock.stock
            newProducts.push(obj)
          }
        }
        const insertedProducts =  await Product.bulkCreate(newProducts)
        res.status(200).json({products: insertedProducts})
      }else{
        console.log('masuk else');
        res.status(200).json({products: products})
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({message : 'error'})
    }
  }

  static async getProductById(req,res) {
    try {
      const data = await Product.findOne({
        where: {
          id: +req.params.id
        }
      })
      res.status(200).json({products: data})
    } catch (err) {
      console.log(err);
      res.status(500).json({message : 'error'})
    }
  }

  static async postProducts(req,res) {
    const obj = {
      category: req.body.category,
      name: req.body.name,
      slug: req.body.slug,
      price: +req.body.price,
      img_url: req.body.img_url,
      stock: +req.body.stock,
    }
    try {
      const data = await Product.create(obj,{
        returning: true
      })
      res.status(201).json(data)
    } catch (err) {
      console.log(err);
      res.status(500).json({message : 'error'})
    }
  }

  static async putProduct(req,res) {
    const obj = {
      category: req.body.category,
      name: req.body.name,
      slug: req.body.slug,
      price: +req.body.price,
      img_url: req.body.img_url,
      stock: +req.body.stock,
    }
    const id = +req.params.id
    try {
      const data = await Product.update(obj,{
        where:{
          id: id
        },
        returning: true
      })
      res.status(200).json({products: data})      
    } catch (err) {
      console.log(err);
      res.status(500).json({message : 'error'})
    }
  }

  static async deleteProduct(req,res) {
    const id = +req.params.id
    try {
      await Product.destroy({
        where: {
          id:id
        }
      })
      res.status(200).json({message : 'ok'})
    } catch (err) {
      console.log(err);
      res.status(500).json({message : 'error'})
    }
  }

}

module.exports = Controller