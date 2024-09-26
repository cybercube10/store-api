const express = require('express')
const router = express.Router()

const {getAllProducts,getALLProductsStatic} = require('../controllers/products')

router.route('/').get(getAllProducts)
router.route('/static').get(getALLProductsStatic)

module.exports =  router
