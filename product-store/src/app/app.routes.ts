import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { inject } from '@angular/core';
import { ProductsService } from './shared/services/products.service';

export const routes: Routes = [
    {
        path: '',
        resolve: {
            products: () => {
                const productService = inject(ProductsService);
                return productService.getAllProducts()
            }
        },
        component: ListComponent
    },
    {
        path: 'create-product',
        loadComponent: () =>
        import('./features/create/create.component').then((m) => m.CreateComponent),
    },
    {
        path: 'edit-product/:id',
        resolve: {
            product: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
              const productService = inject(ProductsService);
              return productService.getProductsById(route.paramMap.get('id') as string)
            }
        },
        loadComponent: () =>
            import('./features/edit/edit.component').then((m) => m.EditComponent)
    }
];
