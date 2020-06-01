import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Primeng
import {TableModule} from 'primeng/table';
import {CarouselModule} from 'primeng/carousel';
import {RatingModule} from 'primeng/rating';

// NGX
// import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    CarouselModule,
    RatingModule
  ],
  declarations: [
  ],
  providers: [],
  exports: [
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    RatingModule
  ],
  bootstrap: []
})

export class SharedModule {}
