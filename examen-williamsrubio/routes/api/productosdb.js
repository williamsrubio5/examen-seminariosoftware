// {{host}}/api/productos/
const express = require("express");
let router = express.Router();

let productModel = require('../../models/productos.model')();

const ProductModelClass = require('../../models/productos/productos.model');
const mdbProductModel = new ProductModelClass();

/**
 * Obtiene todos los registros guardados en el almacen de productos
 * @memberof api/productos
 * @method all
 *
 * @returns {json} Todos los registros almacenados en el almacén de productos
*/

router.get('/all', async (req, res)=>{
  try{
    const rslt = await mdbProductModel.getAll()
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({"msg":"Algo Paso Mal."});
  }
});

router.get('/one/:id', async (req, res)=>{
  try{
    let { id } = req.params;
    let oneDocument = await mdbProductModel.getById(id);
    res.status(200).json(oneDocument);
  } catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

router.get('/sku/:skuid', async(req, res)=>{
  try{
    const { skuid } = req.params;
    let rsltset = await mdbProductModel.getByAttibutes({sku: skuid});
    res.status(200).json(rsltset);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});// get sku/:skuid

router.post('/new', async (req, res)=>{
  try{
    let { sku, name, price, stock=0} = req.body;
    price = Number(price);
    stock = Number(stock);
    var rslt = await mdbProductModel.addOne({ sku, name, price, stock}); // {sku: sku, name:name, price:price, stock:0}
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

router.put('/upd/:id', async (req, res)=>{
  try{
    let {id} = req.params;
    //id = Number(id);
    let {stock, sales} = req.body;
    sales = Number(sales);
    stock = Number(stock);
    let rslt = await mdbProductModel.updateById(id, stock, sales);
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});
  router.put('/sales/:id', async (req, res) => {
    try {
      let { id } = req.params;
      let { stock, sales } = req.body;
      sales = Number(sales);
      stock = Number(stock);
      let rslt = await mdbProductModel.updateSales(id, stock, sales);
      res.status(200).json(rslt);
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ "msg": "Algo Paso Mal." });
    }
});



module.exports = router;
