import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { ShowProductModule } from '../show-product/show-product.module';

@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    ShowProductModule
  ],
  exports:[ProductDetailComponent],
  entryComponents:[ProductDetailComponent]

})
export class ProductDetailModule { }
