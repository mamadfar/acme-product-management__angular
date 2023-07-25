import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from 'src/app/pipes/convert-to-spaces.pipe';
import { StarComponent } from 'src/app/components/shared/star.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from 'src/app/guard/product-detail.guard';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    StarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(
      [
        {path: "products", component: ProductListComponent},
        {path: "products/:id", canActivate: [ProductDetailGuard], component: ProductDetailComponent},
      ]
    )
  ]
})
export class ProductModule { }
