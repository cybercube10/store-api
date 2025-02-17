const Product = require('../models/product')
const getALLProductsStatic = async(req,res)=>{
  const search = 'aaa'
  const products = await Product.find({}).sort('name price')
  res.status(200).json({products})
}

const getAllProducts = async (req,res)=>{
  const {featured,company,name,sort,fields,numericFilters} = req.query
  const queryObject = {}

  if(featured){
    queryObject.featured = featured === 'true'?true:false
  }
  if(company){
    queryObject.company = company
  }
  if(name){
   queryObject.name = {$regex: name , $options:'i'}
  }
  
 
  if(fields){
    const fieldList = await fields.split(',').join(' ')
    results = results.select(fieldList)
  }

  if(numericFilters){
    const operatorMap = {
      '>':'$gt',
      '>=':'$gte',
      '=':'$eq',
      '<':'$lt',
      '<=':'$lte',
    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g

    let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
    const options = ['price','rating']
    filters = filters.split(',').forEach((item)=>{
      const[field,operator,value] = item.split('-')
      if(options.includes(field){
        queryObject[field] = {[operator]}
      })
    })
  }

  let results =  Product.find(queryObject)

  if(sort){
    const sortList = sort.split(',').join(' '  )
     results = results.sort(sortList)
   }
   else{
     results = results.sort('createdAt')
   }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page-1) * limit

  results = results.skip(skip).limit(limit)


  const products = await results
  res.status(200).json({products,nbits:products.length})
}

module.exports = {
  getALLProductsStatic,
  getAllProducts 
}

