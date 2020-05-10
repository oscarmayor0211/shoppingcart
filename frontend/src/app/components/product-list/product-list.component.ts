import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list-table.component.html',
//  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[];
  categoryId:number;
  currentCategoryName: string;
  searchMode: boolean;

  constructor(private productService : ProductService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    
  }

  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }else{
       this.handleListProducts();
    }
  }

  handleSearchProducts(){
    const theKeyword: string= this.route.snapshot.paramMap.get('keyword');

    // now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe(data =>{
      this.products = data;
    })
  }


  handleListProducts(){
    // Compruebo si el parametro id esta disponible 
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')
    
    if(hasCategoryId ){
      //get the id param string. convert string to a number using the "+" symbol
      this.categoryId = +this.route.snapshot.paramMap.get('id');
    
       // get the "name" param string
       this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    }
    else{
      //not category id available ... default to catehory 1
      this.categoryId=1;
      this.currentCategoryName = 'Books';
    }
     this.productService.getProductList(this.categoryId).subscribe(data =>{
       this.products=data;
     });
  }
}
