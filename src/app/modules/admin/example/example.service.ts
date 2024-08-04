import { Observable, ReplaySubject, tap } from 'rxjs';
import { Result } from "./example.types"

@Injectable({ providedIn: 'root' })
export class ExampleService {
  private _results: ReplaySubject<Result[]> = new ReplaySubject<Result[]>(1);
  constructor(private _httpClient: HttpClient) {}
  get results$(): Observable < Result[] > {
    return this._results.asObservable();
  }
  getAllResults(): Observable < Result[] > {
    return this._httpClient
      .get < Result[] > ('/api/results/get_list?page=1')
      .pipe(
        tap((response: any) => {
          this._results.next(response);
        })
      );
  }
}