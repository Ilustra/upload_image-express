
const {Image} = require('../models')
const routes = require ('express').Router()
const multer = require('multer')
const multerConfig= require('../../config/multer')

routes.get('/posts', async(req, res)=>{
    const posts = await Image.findAll()
    return res.json(posts)
})
routes.get('/posts/:ProdutoId', async(req, res)=>{
   return await Image.findAll({where:{ProdutoId: req.params.ProdutoId}}).then(data=>{
      res.json(data)
   }, error=>{
       res.status(400).send('erro ao buscar imagem')
   })
})

routes.post('/posts/:ProdutoId', multer(multerConfig).single('file'), async (req, res)=>{
   console.log(req.file)
   const {ProdutoId} = req.params
    if (!req.file)
    return res.status(400).send('file not found')

    if (!ProdutoId)
    return res.status(400).send('Image: productId not found')

    const {originalname: Name, size: Size, filename: Key, location: Url = ""}= req.file
    return  await Image.create({ Name, Size, Key, Url, ProdutoId }).then(data =>{
        res.json(data)
    }, error =>{
        res.status(400).send(error.error)
    })


})

routes.delete('/posts/:ImageId', async(req, res)=>{
    const {ImageId} = req.params
    const image = await Image.findByPk(ImageId)
   await image.destroy()
    return res.send()
})

module.exports = app => app.use('/auth', routes)