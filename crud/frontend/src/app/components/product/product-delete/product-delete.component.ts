import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})

export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name: '',
    id: 0,
    price: 0
  }

  idProduct: string = ''
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idProduct = this.route.snapshot.paramMap.get('id') || ''
    this.productService.readById(this.idProduct).subscribe(product =>{
      this.product = product
    })
  }

  deleteProduct(){
    this.productService.delete(this.idProduct).subscribe(()=>{
      this.productService.showMessage("Produto excluido com sucesso!")
      this.router.navigate(['/products'])
    })
  }

  cancel(){
    return this.router.navigate(['/products'])
  }
}
