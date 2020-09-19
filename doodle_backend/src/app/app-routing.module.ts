import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RegisterComponent } from './register/register.component';
import { ShowProductComponent } from './show-product/show-product.component';


const routes: Routes = [

  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: 'create_product', component: CreateProductComponent },
  { path: 'show_product', component: ShowProductComponent },
  { path: 'product_detail', component: ProductDetailComponent },
  {path:'edit',component:EditComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
