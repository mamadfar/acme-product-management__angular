import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "../../types/product.type";
import { ProductService } from "../../services/product.service";
import { Subscription } from "rxjs";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';
  imageStyle: { width: number; margin: number } = {
    width: 50,
    margin: 2,
  };
  showImage: boolean = false;
  errorMessage: string = "";
  sub?: Subscription;
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  private _listFilter: string = "";
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value)
  }

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err,
      complete: () => console.log("Request has been done!")
    });
  };
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(product => product.productName.toLocaleLowerCase().includes(filterBy));
  }

  onRatingClicked(message: string): void {
    this.pageTitle = `Product List: The message is: ${message}`
  }
}