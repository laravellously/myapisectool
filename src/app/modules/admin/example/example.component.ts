import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { Result } from "./example.types"

@Component({
    selector     : 'example',
    standalone   : true,
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      FormsModule
    ],
})
export class ExampleComponent implements OnInit, OnDestroy
{
  results: Result[]
  inputValue: string = '';
  isLoading: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject();
    /**
     * Constructor
     */
    constructor(private _authService: AuthService) {}
    
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    
    /**
     * On init
     */
    ngOnInit(): void {
      // Get the FAQs
      this._authService.results$
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
    
    onSubmit() {
      if (this.inputValue.trim() && !this.isLoading) {
        this.isLoading = true;
        console.log('Submitted value:', this.inputValue);
  
        // Simulate an async operation (e.g., API call)
        setTimeout(() => {
          this.isLoading = false;
          this.inputValue = ''; // Clear the input after submission
        }, 10000); // Simulate 10 seconds of loading time
      }
    }
}
