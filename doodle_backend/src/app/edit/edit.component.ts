import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public personForm: FormGroup;
  products: any = {}
  public URL="http://localhost:3000"

  public person = {
    firstName: 'Jack',
    lastName:  'Daniels'
  }

constructor(private fb: FormBuilder,private route:ActivatedRoute,private http:HttpClient ){

  // Create FormGroup
  this.personForm = this.fb.group({
    productname: '',
    quantity: '',
    pricing:''
  });
  this.route.params.subscribe((params) => {
    this.products=JSON.parse(params.productName)   
      console.log(this.products.pricing,"edit name");  
      this.personForm.controls["productname"].setValue(this.products.productName);
      this.personForm.controls["quantity"].setValue(this.products.quantity);
      this.personForm.controls["pricing"].setValue(this.products.pricing);

      });


}  ngOnInit(): void {
 
    // throw new Error('Method not implemented.');
  }
  saveForm(){
    console.log(this.personForm.value);
    
  const headers= new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : 'http://localhost:3000',
    'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE'  ,
    'Authorization': localStorage.getItem('token')
  })
    // this.userservice.product(this.registerForm.value)
    var payload={
      productName:this.personForm.value.productname,
      quantity:this.personForm.value.quantity,
      pricing:this.personForm.value.pricing,
      productId:this.products.productId,
      userId:localStorage.getItem('userId')

    }
this.http.post(this.URL+"/updateOrderDetail",JSON.stringify(payload),
{
  headers:headers
}
).subscribe(updateProduct=>{
  console.log(updateProduct,"update detail");
})  
  }
  resetForm(){

  }
}
