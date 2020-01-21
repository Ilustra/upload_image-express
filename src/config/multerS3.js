const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

const storageTypes={
    local:multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, path.resolve(__dirname,'..', '..', 'tmp', 'uploads' ));
        },
        filename:(req, file, cb)=>{
            crypto.randomBytes(16, (err, hash)=>{
                if (err) cb(err)
                file.key = `${hash.toString('hex')}-${file.originalname}`
                cb(null, file.key)
            })
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket:'apiUploads',
        //ler o tipo de arquivo enviado e atribui content-type, e o  navegador entende que pode ler caso contrario ele irá fazer o download
        contentType:multerS3.AUTO_CONTENT_TYPE,
        //permissão
        acl:'public-read',
        key:(req, file, cb)=>{
            crypto.randomBytes(16, (err, hash)=>{
                if (err) cb(err)
                const fileName = `${hash.toString('hex')}-${file.originalname}`
                cb(null, fileName)
            })
        }
    })
}

module.exports ={
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage:  storageTypes["s3"],
    limits:{
        fileSize: 2 * 1024 * 1024
    },
    fileFilter:(req, file, cb)=>{
        const allowedMimes =[
            'image/jpeg',
            'image/pjepg',
            'image/png',
            'image/fig'
        ];
        if (allowedMimes.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error('invalid file type.'))
        }
    }
}