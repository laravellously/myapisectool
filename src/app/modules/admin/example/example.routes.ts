import { Routes } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { AuthService } from 'app/core/auth/auth.service';


export default [
    {
        path     : '',
        component: ExampleComponent,
        resolve: {
          results: () =>
            inject(AuthService).getAllResults(),
        },
    },
] as Routes;
