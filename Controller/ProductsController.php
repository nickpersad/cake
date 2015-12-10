<?php
class ProductsController extends AppController {
    public function index() {
        //fetch products resultset from databse
        $products = $this->Product->find('all',array('fields'=>array('Product.id','Product.title','Product.description','Product.price','Product.created','Product.status'),'conditions'=>array('Product.status'=>1)));

        //set products data and pass to the view 
        $this->set('products',$products);
    }
}