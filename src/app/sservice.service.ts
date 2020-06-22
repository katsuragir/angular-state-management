import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Items } from './models/items';
import { Observable } from 'rxjs';
import { ItemsList, ItemDetail } from './action/items.actions';

@Injectable({
  providedIn: 'root'
})
export class SserviceService {

  public url = 'https://graphql.anilist.co'

  constructor(private http: HttpClient, private store: Store<{ items: Items }>) {this.load()}

  private getItmes():Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('Accept', 'application/json');

    const variabel = {
			search: "a",
			page: 1,
			perPage: 30
		}
		const data = {
			query: `query ($id: Int, $page: Int, $perPage: Int, $search: String) {
				Page (page: $page, perPage: $perPage) {
				  pageInfo {
					total
					currentPage
					lastPage
					hasNextPage
					perPage
				  }
				  media (id: $id, search: $search) {
					id
					title {
					  romaji
					}
				  }
				}
			  }`,
			variables : variabel
		}
		return this.http.post<any>(this.url, data, { headers: httpHeaders });
  }

  private getItmedetail(id):Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('Accept', 'application/json');

    const variabel = {
			id: id
		}
		const data = {
			query: `query ($id: Int) { # Define which variables will be used in the query (id)
				Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
				  id
				  title {
					romaji
				  }
				}
			  }`,
			variables : variabel
		}
		return this.http.post<any>(this.url, data, { headers: httpHeaders });
  }

  public load() {
    return this.getItmes().subscribe(
      res => {
		this.store.dispatch(new ItemsList(res));
      }
    )
  }

  public itemdetail(id) {
	return this.getItmedetail(id).subscribe(
		res => {
		  this.store.dispatch(new ItemDetail(res));
		}
	  )
  }
}
