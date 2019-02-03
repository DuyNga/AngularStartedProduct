import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
    pageTittle: String = "Product List!";
    imageWidth: number = 50;
    imageMargin: number = 10;
    showImage: boolean = true;
    _listFilter: string;
    set listFilter(lstFilter: string) {
        this._listFilter = lstFilter;
        this.filteredProducts = this.listFilter ? this.performFilter() : this.products;
    }
    get listFilter(): string {
        return this._listFilter;
    }
    filteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService) {
    }
    onRatingClicked(message: string): void {
        this.pageTittle = 'Product List: ' + message;
    }
    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            products => {
            this.products = products;
                this.filteredProducts = this.products;
            }
        );
        this.listFilter = "";
    }
    toggleImage(): void {
        this.showImage = !this.showImage;
    }
    performFilter(): IProduct[] {
        let filterBy: string = this.listFilter.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
}
