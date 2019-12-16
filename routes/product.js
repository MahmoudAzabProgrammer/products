let fs = require("fs")


module.exports = {
    addProductPage : (req, res, next) => {
        res.render("addProduct.ejs", {
            message: "",
            title:  "Add New Product | Products Managemnet App",

            })
    },
    addProduct : (req, res, next) => {
        if(!req.files)
            return res.status(400).send("No Product Image Uploaded")
        let message = "",
            category = req.body.category,
            productName = req.body.name,
            description = req.body.description,
            quantity = req.body.quantity,
            price  = req.body.price,
            uploadedFile = req.files.image

            
            let insertQuery = "INSERT INTO `products`( `product_name`, `description`, `quantity`, `price`, `image`, `category`) VALUES ('"+productName+"','"+description+"','"+quantity+"','"+price+"','"+uploadedFile.name+"','"+category+"')"
            // console.log(message)
            
            db.query(insertQuery, (err, result) => {
                if(err) return res.status(500).send(err)
                else
                msessage = "Product" + result.insertId+"added Successfully"
                //Upload for Product image
                    let fileExension = uploadedFile.name.split('.')[1];
                    let imageName = result.insertId + "." + fileExension;
                    if(uploadedFile.mimetype == 'image/png' || 'image/jpeg'|| 'image/pmb'|| 'image/gif') {
                        uploadedFile.mv('public/assets/images/' + imageName) , (err) => {
                            if(err) return res.status(500).send(err)

                        }
                        res.redirect("/")
                    }
                    else {
                        message = "invlid image format .. Only 'png' or 'jpg' or 'jpeg' or 'bmp'"
                        res.render("addProduct.ejs", {
                            message:message,
                            title:  "Add Product | Products Managemnet App",
                
                            })
                    }
                // res.render("addProduct.ejs", {
                // message: message,
                // title:  "Add Product | Products Managemnet App",
    
                // })
            })

    },
    editProductPage : (req, res, next) => {
        let productId = req.params.id
        let selectQuery =  "SELECT * FROM `products` WHERE product_id ="+ productId
        db.query(selectQuery, (err, result) => {
            if(err) return res.status(500).send(err);
            console.log(result)

            res.render("editProduct.ejs", {
                title: "Welcome to Products Managements || Edit Product",
                product : result[0],
                message: result[0].product_name
            })
        })
        
    },
    editProduct : (req, res, next) => {

        let message = "",
            category = req.body.category,
            productName = req.body.name,
            description = req.body.description,
            quantity = req.body.quantity,
            price  = req.body.price,
            uploadedFile = req.files.image,
            productId = req.params.id

            let updateQuery = "UPDATE `products` SET `product_name`='"+productName+"',`description`='"+description+"',`quantity`="+quantity+",`price`="+price+",`image`='"+uploadedFile.name+"',`category`='"+category+"' WHERE `product_id` = "+productId+""
            console.log(updateQuery)
            db.query(updateQuery, (err, result) => {
                if(err) return res.status(500).send(err)
                else
                msessage = "Product" + productId+"Updated Successfully"
                //Upload for Product image
                    let fileExension = uploadedFile.name.split('.')[1];
                    let imageName = productId + "." + fileExension;
                    if(uploadedFile.mimetype == 'image/png' || 'image/jpeg'|| 'image/pmb'|| 'image/gif') {
                        uploadedFile.mv('public/assets/images/' + imageName) , (err) => {
                            if(err) return res.status(500).send(err)

                        }
                        res.redirect("/")
                    }
                    else {
                        message = "invlid image format .. Only 'png' or 'jpg' or 'jpeg' or 'bmp'"
                        res.render("editProduct.ejs", {
                            
                            title:  "Edit Product | Products Managemnet App",
                            product: result[0],
                            message:'',
                            })
                    }
                // res.render("addProduct.ejs", {
                // message: message,
                // title:  "Add Product | Products Managemnet App",
    
                // })
            })
            
    },
    deleteProduct : (req, res, next) => {
        let productId = req.params.id
        let deleteQuery = "DELETE FROM `products` WHERE `product_id` = "+productId+""
        console.log(deleteQuery)
        db.query(deleteQuery, (err, result) => {
            if(err) return res.status(500).send(err)
            // fs.unlink("public/assets/images" +productId+".jpg", (err) => {
            //     return res.status(500).send(err)

            // })
            res.redirect("/")
        })
    }
}