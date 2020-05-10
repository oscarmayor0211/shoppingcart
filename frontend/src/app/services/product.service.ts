import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_SERVICES } from '../config/config';
import { ProductCategory } from '../model/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // private Url= 'http://localhost:8080/api/products';
  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId :number): Observable<Product[]>{
    //need to build URL  based on category id
    const searchUrl = URL_SERVICES + `/products/search/findByCategoryId?id=${theCategoryId}`;
    console.log("RUTA", searchUrl);
    
    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    let Url = URL_SERVICES + '/product-category';
    return this.httpClient.get<GetResponseProductCategory>(Url).pipe(
      map(res => res._embedded.productCategory)
    );
  }

  searchProducts(theKeyword: string): Observable<Product[]>  {
  //need to build URL  based on the keyword
  const searchUrl = URL_SERVICES + `/products/search/findByNameContaining?name=${theKeyword}`;
  console.log("RUTA", searchUrl);
  
  return this.getProducts(searchUrl); 
  }



  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(map(res => res._embedded.products));
  }
}



interface GetResponseProduct{
  _embedded:{
    products:Product[];
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}