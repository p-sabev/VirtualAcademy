import {Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../_services/loader.service';
import { LoaderState } from './loader';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy, AfterViewChecked {
  show = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService,
              private cdRef: ChangeDetectorRef,
              public authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
