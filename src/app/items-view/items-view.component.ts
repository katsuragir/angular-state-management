import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Items, media } from '../models/items';
import { Observable, Subscription, fromEvent, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, skip, delay, first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { SserviceService } from '../sservice.service';
import { ItemsList, ItemReset } from '../action/items.actions';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.scss']
})
export class ItemsViewComponent implements OnInit {

  items: Observable<Items[]>;
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  private subscriptions: Subscription[] = [];
  clear = false;
  private itemsSubject$: BehaviorSubject<media[]> = new BehaviorSubject([]);
  item: Observable<media[]> = this.itemsSubject$.asObservable();

  constructor(private store: Store<{ items: Items[] }>, 
    private spinner: NgxSpinnerService, private router: Router, private activatedRoute: ActivatedRoute,) {
    /** spinner starts on init */
    this.spinner.show();
  }

  ngOnInit(): void {
    this.items = this.store.pipe(select('items'));
    this.store.pipe(select('items')).subscribe(x => {if (x.length > 0) {this.itemsSubject$.next(x[0].data.Page.media);}});
    // Filtration, bind to searchInput
		const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			debounceTime(150),
			distinctUntilChanged(),
			tap(() => {
				this.filterConfiguration();
			})
		)
		.subscribe();
		this.subscriptions.push(searchSubscription);
    
  }

  /**
	 * Load Products List
	 */
	loadProductsList() {
		// Call request from server
		this.store.dispatch(new ItemsList(this.filterConfiguration()));
  }
  
  /**
	 * Returns object for filter
	 */
	filterConfiguration() {
    this.store.pipe(select('items')).subscribe(x => {if (x.length > 0) {this.itemsSubject$.next(x[0].data.Page.media)}});
    let searchText: string;
		if (!this.clear) {
			searchText = this.searchInput.nativeElement.value;
		} else {
			searchText = '';
		}

    this.clear = false;

    // this.store.dispatch( new ItemReset());
    
    let data = [];

    this.item.subscribe(x => x.filter( i => { if (i.title.romaji.toLowerCase().includes(searchText.toLowerCase())) { data.push(i) } }))

    // this.store.dispatch

    this.itemsSubject$.next(data);
  }
  
  detail(item: media) {
    this.router.navigate(['/product/detail', item.id], { relativeTo: this.activatedRoute });
  }

}
