import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowProductComponent } from './show-product.component';



@NgModule({
  declarations: [ShowProductComponent],
  imports: [
    CommonModule
  ],
  exports:[ShowProductComponent],
  entryComponents:[ShowProductComponent]
})
export class ShowProductModule { }
