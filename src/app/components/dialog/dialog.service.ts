import { Injectable, Injector, ApplicationRef, ComponentRef, createComponent } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogComponentRef: ComponentRef<any> | null = null;

  constructor(private appRef: ApplicationRef, private injector: Injector) { }

  open(component: any, data: any = {}): { afterClosed: Promise<any> } {
    // Dynamically create the dialog component
    this.dialogComponentRef = createComponent(component, {
      environmentInjector: this.appRef.injector, // Attach the app-level injector
    });

    // Pass data to the component
    Object.assign(this.dialogComponentRef.instance, { data });

    // Attach the component to the DOM
    this.appRef.attachView(this.dialogComponentRef.hostView);
    const domElem = (this.dialogComponentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Handle the close event
    const afterClosed = new Promise((resolve) => {
      this.dialogComponentRef?.instance.close = (result: any) => {
        resolve(result);
        this.close();
      };
    });

    return { afterClosed };
  }

  close(): void {
    if (this.dialogComponentRef) {
      this.appRef.detachView(this.dialogComponentRef.hostView);
      this.dialogComponentRef.destroy();
      this.dialogComponentRef = null;
    }
  }
}
