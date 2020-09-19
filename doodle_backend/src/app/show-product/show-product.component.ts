import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { APIServiceService } from '../apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../notification.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  public URL = "http://localhost:3000"
  searchText;
  productList = [];
  products = [];
  unchangedValue: any;
  alert: boolean = false;
  alert1: boolean = false;
  constructor(private router: Router, public route: ActivatedRoute, private APiService: APIServiceService, private http: HttpClient, private NotificationService: NotificationService) { }
  imageSrc = '../../assets/brocoli.jpg'
  imageAlt = 'iPhone'
  @Output() valueChange = new EventEmitter();

  ngOnInit(): void {
  }
  productDetail() {
    let products = this.APiService.showProductDetails().subscribe((val: any) => {
      console.log(val, "val");
      this.products = val.result;
      this.unchangedValue = val.result;
    });
  }
  deleteProduct(product) {
  
    console.log(localStorage.getItem('userId'), "local");
    var productId= product.productId;
    console.log(productId,"productId");
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      }),
      body: {
        productId: productId,
      }
    }

    this.http.delete(this.URL+"/deleteOrder", options).subscribe(s => {
      console.log(s);
    })
    // return this.http.delete(this.URL+"/deleteOrder"/${productId}`, { responseType: 'json' });
  }
  search(event) {
    console.log(event.target.value);
    this.products = this.unchangedValue;
    this.products.filter(data => {
      if (data.productName === event.target.value) {
        this.productList.push(data);
      }
    });
    this.products = this.productList;
    console.log(this.productList, "kk");
  }
  showProduct(product) {
    console.log(product, "show particular product");
    this.productList = product;
    localStorage.setItem('product', product)

    // this.router.navigateByUrl('/product_detail', product.productName)
    this.router.navigate(['/product_detail', { productName: JSON.stringify(product) }]);

    // this.router.navigate(['product_detail'], { 
    //   state: { "productdetail": product } 
    // });

    this.valueChange.emit(product);
  }
  placeOrder(product) {

    // let placeOrder = this.APiService.placeOrderDetails(product);

    const payload = {
      "productId": product.productId,
      "quantity": product.quantity,
      "pricing": product.pricing,
      "userId": localStorage.getItem('userId')
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Authorization': localStorage.getItem('token')

    })

    console.log(localStorage.getItem('userId'), "local");

    return this.http.post(this.URL + "/placeOrderDetail", payload, {
      headers: headers
    }).subscribe(order => {
      console.log(order, "order");
      // this.alert=true;
      // this.NotificationService.showSuccess("Message:", order)
    })

  }

}
