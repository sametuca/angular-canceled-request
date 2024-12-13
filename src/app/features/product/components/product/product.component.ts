import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [CommonModule],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => (this.products = data),
        error: (error) =>
          console.error('Ürünler alınırken bir hata oluştu:', error),
      });
  }

  cancelRequest(): void {
    this.destroy$.next(); // Mevcut istekleri iptal et
    this.destroy$.complete(); // Subject'i tamamla
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Tüm istekleri iptal et
    this.destroy$.complete(); // Subject'i temizle
  }
}
