import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RootComponent } from './root/root.component';

// Ngrx
import { StoreModule } from '@ngrx/store'; 
import { ListReducer } from './reducer/item.reducer';
import { ItemsViewComponent } from './items-view/items-view.component';
import { NgxSpinnerModule } from "ngx-spinner";

// service
import { SserviceService } from './sservice.service';
import { ItemDetailComponent } from './item-detail/item-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    ItemsViewComponent,
    ItemDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({ items: ListReducer }),
    NgxSpinnerModule
  ],
  providers: [SserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
