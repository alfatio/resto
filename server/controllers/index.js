const { Product } = require('../models')
const axios = require('axios').default
const builder = require('xmlbuilder')
const path = require('path')
const fs = require('fs')

class Controller {

  static async getProducts(req,res) {
    let limit = +req.query.limit
    let page = +req.query.page
    let category = req.query.category
    try {
      let option = {
        where: {
        },
        limit: limit,
        order: [['id','DESC']]
      }
      let optionCount = {
        where: {}
      }
      if(category) {
        option.where.category = category
        optionCount.where.category = category
      }
      if(page != 1) option.offset = page * limit - limit
      console.log(option);
      const products = await Product.findAll(option)
      const totalProd = await Product.count(optionCount)
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
        res.status(200).json({products: insertedProducts,total: totalProd})
      }else{
        console.log('masuk else');
        res.status(200).json({products: products,total: totalProd})
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
    console.log(obj);
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

  static async downloadXML(req,res) {
    let query = req.body.data
    try {
      let root = builder.create('squares')
      root.com('Products')
      const data = JSON.parse(query)
      for(let i = 0; i < data.length; i++){
        let item = root.ele('data')
        item.att('category',data[i].category)
        item.att('name',data[i].name)
        item.att('slug',data[i].slug)
        item.att('price',data[i].price)
        item.att('img_url',data[i].img_url)
        item.att('stock',data[i].stock)
      }
      let xml = root.end({ pretty: true})
      fs.writeFileSync(path.join(__dirname,'../assets/','products.xml'),xml)
      // Content-Type: image/png
      // Content-Disposition: attachment; filename="picture.png"
      res.set({
        'Content-Type' : 'text/xml-external-parsed-entity',
        'Content-Disposition' : 'attachment; filename="products.xml"'
      })
      res.sendFile(path.join(__dirname,'../assets/','products.xml'))
    } catch (err) {
      console.log(err);
      res.status(500).json({message : 'error'})
    }
  }

}

module.exports = Controller