import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Items, media } from '../models/items';
import { Observable, BehaviorSubject } from 'rxjs';
import { SserviceService } from '../sservice.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  
  private itemsSubject$: BehaviorSubject<media[]> = new BehaviorSubject([]);
  private itemSubject$: BehaviorSubject<media> = new BehaviorSubject(null);
  items: Observable<media[]> = this.itemsSubject$.asObservable();
  item: Observable<media> = this.itemSubject$.asObservable();

  constructor(private route: ActivatedRoute, private store: Store<{ items: Items[] }>, private service: SserviceService,
    private router: Router) { }

  ngOnInit(): void {
    this.store.pipe(select('items')).subscribe(x => {if (x.length > 0) {this.itemsSubject$.next(x[0].data.Page.media);}});
    this.route.params.subscribe(params => {
      const id = params['id'];

      if (!id) {
        this.router.navigate(['/']);
        return;
      }

      let data = [];

      this.items.subscribe(x => x.filter( i => { if (i.id === +id) { data.push(i); } }))

      // this.store.dispatch

      this.itemSubject$.next(data[0]);

      this.item.subscribe(x => { if (!x) {this.router.navigate(['/product/list']);} });
    });
  }

}
