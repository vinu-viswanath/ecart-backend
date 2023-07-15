//import wishlists
const wishlists = require('../models/wishlistSchema')

//logic for wishlist

exports.addtowishlist=async(req,res)=>{
    //get product details from request
    // req.body={
    //     id:'3',
    //     title:'hd',
    //     price:4444
    // }
    //destrcture req.body
    const {id,title,price,image} = req.body

    //logic
    try{
        const item = await wishlists.findOne({id})
        if(item){
            res.status(404).json("product already exists")
        }
        else{
            //add item to wishlist collection
            const newItem = new wishlists({id,title,price,image})
            //To store in wishlist collection
            await newItem.save()
            //response send back to the client
            res.status(200).json("product added to the wishlist")

        }

    }
    catch(error){
        res.status(404).json(error)
    }
}

//logic for view wishlist product details 

exports.getWishlist=async(req,res)=>{
    //logic for view wishlists product details
    try{
        const allWishlists = await wishlists.find()
        res.status(200).json(allWishlists)
    }
    catch(error){
        res.status(404).json(error)
    }
    
}

//delete wishlist product details
exports.deleteWishlist = async(req,res)=>{

    //get id from the request
    const {id} = req.params

    //logic for delete wishlist product details
    try{
        const removeWishlists = await wishlists.deleteOne({id})

        //get all wishlist products after removing particular product details
        if(removeWishlists){
            const allitems = await wishlists.find()
            res.status(200).json(allitems)
        }
    }

    catch(error){
        res.status(404).json(error)
    }
}