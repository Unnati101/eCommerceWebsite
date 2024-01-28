import productModel from "../models/productModel.js"
import fs from 'fs'
import  slugify  from 'slugify';

export const createProductController = async(req,res)=>{
    try{

        const { name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error: 'Name is Requird'})
            case !description:
                        return res.status(500).send({error: 'description is Requird'})
            case !price:
                            return res.status(500).send({error: 'price is Requird'})
            case !category:
                                return res.status(500).send({error: 'category is Requird'})
            case !quantity:
                                    return res.status(500).send({error: 'quantity is Requird'})
            case photo && photo.size > 1000000:
                                        return res.status(500).send({error: 'photo is Required and should be less than 1mb'})
            }

        const products = new productModel({...req.fields, slug:slugify(name)})
         if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.contentType
         }
         await products.save()
         res.status(201).send({
            success:true,
            message:'Product Created Successfully',
            products,
         });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: 'Error in creating Product'
        });
    }
};

//get all products
export const getProductController= async(req,res)=>{
    try{
        const products = await productModel
        .find({})
        .populate('category')
        .select("-photo")
        .limit(12)
        .sort({createAt: -1});
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "All Products",
            products,
            
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in getting products',
            error: error.message
        });
    }
};

//single product

export const getSingleProductController =async(req,res)=>{
    try{
        const products = await productModel
        .findOne({slug: req.params.slug})
        .select("-photo")
        .populate('category')
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            products,
            
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error while getting a single products',
            error: error.message
        });
    }
};

//get product photo
export const productPhotoController =async(req,res)=>{
    try{
        const products= await productModel
        .findById(req.params.pid)
        .select("photo");
        if(products.photo.data){
            res.set("Content-type", products.photo.contentType);
            return res.status(200).send(products.photo.data);

        }

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error while getting photo of products',
            error: error.message
        });
    }
};

//delete product
 export const deleteProductController= async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.params.pid)
        .select("-photo");
        res.status(200).send({
            success:true,
            message: "Product deleted successfully",

        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error while deleting products',
            error: error.message
        });
    }
};
 
export const updateProductController = async(req,res)=>{
    try{

        const { name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error: 'Name is Requird'})
            case !description:
                        return res.status(500).send({error: 'description is Requird'})
            case !price:
                            return res.status(500).send({error: 'price is Requird'})
            case !category:
                                return res.status(500).send({error: 'category is Requird'})
            case !quantity:
                                    return res.status(500).send({error: 'quantity is Requird'})
            case photo && photo.size > 1000000:
                                        return res.status(500).send({error: 'photo is Required and should be less than 1mb'})
            }

        const products = await productModel.findByIdAndUpdate(req.params.id,
            {...req.fields, slug:slugify(name)}, {new:true}
        )
         if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.contentType
         }
         await products.save()
         res.status(201).send({
            success:true,
            message:'Product Updated Successfully',
            products,
         });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: 'Error in Updating Product'
        });
    }
   
};
    