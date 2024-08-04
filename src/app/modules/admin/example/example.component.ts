import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector     : 'example',
    standalone   : true,
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
      MatFormFieldModule,
      MatInputModule,
      MatIconModule
    ],
})
export class ExampleComponent
{
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}
}
