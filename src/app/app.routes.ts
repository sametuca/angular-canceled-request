import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product/components/product/product.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
];

export default routes;