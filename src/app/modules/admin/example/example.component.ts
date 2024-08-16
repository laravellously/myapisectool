import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';
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
    constructor(
      private _authService: AuthService, 
      private toast: HotToastService
    ) {}
    
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    
    /**
     * On init
     */
    ngOnInit(): void {
      // Get the Results (working)
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
    
    refetchResults(){
      // Get the Results (working)
      this._authService.results$
        .pipe(
          this.toast.observe({
            loading: 'Fetching scans...',
            success: 'Fetch completed!',
            error: 'Could not complete fetch.',
          }))
        .pipe(takeUntil(this._unsubscribeAll))
          // takeUntil(this._unsubscribeAll)
        .subscribe((results) => {
          console.log("Refetch results: ", results)
          this.results = results;
        });
    }
    
    isValidHttpUrl(str) {
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
      );
      return pattern.test(str);
    }
    
    onSubmit() {
      if (this.inputValue.trim() && !this.isLoading && this.isValidHttpUrl(this.inputValue)) {
        this.isLoading = true;
        this._authService
          .postScanRequest(this.inputValue)
          .pipe(
            this.toast.observe({
              loading: 'Scanning...',
              success: 'Scan complete!',
              error: 'Could not complete scan.',
            })
          )
          .subscribe();
        // console.log('Submitted value:', this.inputValue);
  
        // Simulate an async operation (e.g., API call)
        setTimeout(() => {
          this.isLoading = false;
          this.inputValue = ''; // Clear the input after submission
          this._authService.results$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((results) => {
              console.log("Latest results: ", results)
              this.results = results;
            });
        }, 20000); // Simulate 20 seconds of loading time
      } else {
        this.toast.error('Invalid URL')
      }
    }
}
