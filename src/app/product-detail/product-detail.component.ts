import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  products: any = {}
  quantity;
  pricing;
  description;
  constructor(private route: ActivatedRoute, private router: Router) { }
  productName;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.products = JSON.parse(params.productName)
    });
    // var event= localStorage.getItem('product')
  }
  update() {
    this.router.navigate(['/edit', { productName: JSON.stringify(this.products) }]);
  }
 
}
