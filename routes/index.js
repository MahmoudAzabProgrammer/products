module.exports = {
    mainPage : (req, res, next) => {
        // res.render("index.ejs", {
        //     data: "no data exists",
        //     title: "Main Page",

        // })

        let selectQuery = "SELECT * FROM `products` Order By product_id ASC"
        db.query(selectQuery, (err, result) => {
            if(err) return res.status(500).send(err);
            console.log(result)
            res.render("index.ejs", {
                title: "Welcome to Products Managements || view Product",
                products : result
            })
        })
    }
}