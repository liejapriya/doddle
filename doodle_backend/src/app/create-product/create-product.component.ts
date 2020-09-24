import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  createProductForm: FormGroup;
  loading = false;
  submitted = false;
  psject:boolean;
    public URL="http://localhost:3000"
product:any;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private http:HttpClient,
  ) { 
      // redirect to home if already logged in
          // this.router.navigate(['/']);
      
  }
  ngOnInit() {
    this.createProductForm = this.formBuilder.group({
      productName: ['', Validators.required],
        quantity: ['', Validators.required],
        pricing: ['', Validators.required],
        brandName:['',Validators.required],
        description:['',Validators.required]
          });
}

// convenience getter for easy access to form fields
get f() { return this.createProductForm.controls; }
onSubmit(){
  console.log(this.createProductForm.value,"val");
  
  this.submitted=true;
console.log(localStorage.getItem('token'),"token product component");

  const headers= new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : 'http://localhost:3000',
    'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE'  ,
    'Authorization': localStorage.getItem('token')
  })
    // this.userservice.product(this.registerForm.value)
this.http.post(this.URL+"/insertProductDetail",JSON.stringify(this.createProductForm.value),
{
  headers:headers
}
).subscribe(product=>{
  console.log("product");
  console.log(product,"product detail");
})
}

showproduct(){
  console.log("entered");
  this.router.navigateByUrl('/show_product')
}
}