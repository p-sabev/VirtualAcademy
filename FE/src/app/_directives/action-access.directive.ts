import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appActionAccess]'
})
export class ActionAccessDirective implements OnInit {
  private userPermissions = JSON.parse(localStorage.getItem('permissions'));
  private flatPermissions = JSON.parse(localStorage.getItem('permissionsFlat'));
  private permission;

  constructor(private element: ElementRef,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  ngOnInit() {
  }

  @Input()
  set appActionAccess(val) {
    this.permission = val;
    this.updateView();
  }

  private updateView() {
    if (this.permission === false) {
      this.viewContainer.clear();
    } else if (this.permission === true || (this.flatPermissions && this.checkFlatPermissions())) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkFlatPermissions() {
    let hasRights = false;
    this.permission.split(', ').forEach(searchedPermission => {
      if (this.flatPermissions[searchedPermission]) {
        hasRights = true;
      }
    });
    return hasRights;
  }
}
