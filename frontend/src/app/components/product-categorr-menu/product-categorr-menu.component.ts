import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/model/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-categorr-menu',
  templateUrl: './product-categorr-menu.component.html',
  styleUrls: ['./product-categorr-menu.component.css']
})
export class ProductCategorrMenuComponent implements OnInit {

  productCategories: ProductCategory[];

  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.listCategories();
  }
  listCategories() {
    this.productService.getProductCategories().subscribe(data=>{
      // console.log("product =" + JSON.stringify(data));
      this.productCategories=data;
      console.log("produc" + JSON.stringify(this.productCategories));

    });
  }

}
