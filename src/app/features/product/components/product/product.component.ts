import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  private abortController: AbortController | null = null;

  constructor() {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  async getAllProducts() {
    this.abortController = new AbortController();
    const signal = this.abortController.signal;

    try {
      setTimeout(async () => {
        const response = await fetch('http://localhost:3000/products', { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        this.products = await response.json();
      }, 2000);
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Fetch isteği iptal edildi.');
      } else {
        console.error('Ürünler alınırken bir hata oluştu:', error);
      }
    }
  }

  generateRandomPrice(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }

  cancelRequest() {
    if (this.abortController) {
      this.abortController.abort(); // Fetch isteğini iptal et
      this.abortController = null; // Controller'ı sıfırla
    }
  }
}

export interface Product {
  id: number;
  name: string;
  price: number;
}
