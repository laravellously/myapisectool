import { Routes } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { ExampleService } from 'app/modules/admin/example/example.service';

export default [
    {
        path     : '',
        component: ExampleComponent,
        resolve: {
          results: () =>
            inject(ExampleService).getAllResults(),
        },
    },
] as Routes;
