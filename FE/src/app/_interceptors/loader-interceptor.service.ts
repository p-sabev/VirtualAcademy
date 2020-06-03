import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../_services/loader.service';
import { EmittersService } from '../_services/emitter.service';

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {

  constructor(private loaderService: LoaderService, private emitterService: EmittersService) {
  }
  countOfRequests = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.params.get('dontShowLoader') !== 'true') {
      this.showLoader();
    }

    return next.handle(req).pipe
    (tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (req.params.get('dontShowLoader') !== 'true') {
          this.hideLoader();
        }
      }
    }, (err: any) => {
      this.hideLoader();
    }));
  }

  private showLoader(): void {
    this.countOfRequests++;
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.countOfRequests--;
    if (this.countOfRequests <= 0) {
      this.countOfRequests = 0;
      this.loaderService.hide();
    }
  }

}
