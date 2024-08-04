import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';
import { Result } from "./example.types"

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
export class ExampleComponent implements OnInit, OnDestroy
{
  results: Result[]
  private _unsubscribeAll: Subject<any> = new Subject();
    /**
     * Constructor
     */
    constructor(private _exampleService: ExampleService) {}
    
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    
    /**
     * On init
     */
    ngOnInit(): void {
      // Get the FAQs
      this._service.results$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((results) => {
          this.results = results;
        });
    }
    
    /**
     * On destroy
     */
    ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
    }
    
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
      return item.id || index;
    }
}
