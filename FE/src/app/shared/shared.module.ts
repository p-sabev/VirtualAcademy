import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Primeng
import {TableModule} from 'primeng/table';
import {CarouselModule} from 'primeng/carousel';
import {RatingModule} from 'primeng/rating';
import {ActionAccessDirective} from '../_directives/action-access.directive';
import {InputSwitchModule} from 'primeng/inputswitch';

// NGX
// import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    CarouselModule,
    RatingModule,
    InputSwitchModule
  ],
  declarations: [
    ActionAccessDirective
  ],
  providers: [],
  exports: [
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    RatingModule,
    InputSwitchModule,
    ActionAccessDirective
  ],
  bootstrap: []
})

export class SharedModule {}
