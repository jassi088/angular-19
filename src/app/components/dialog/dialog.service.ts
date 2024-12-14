/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Injectable,
    ComponentRef,
    ApplicationRef,
    Injector,
    createComponent,
} from '@angular/core';
import { DialogComponent } from './dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
    private dialogContainerRef!: ComponentRef<DialogComponent>;

    constructor(private injector: Injector, private appRef: ApplicationRef) { }

    open<T>(component: any, data?: any): Promise<T> {
        this.dialogContainerRef = this.createDialogContainer();

        const contentComponentRef = this.createContentComponent(component, data);

        return new Promise((resolve) => {
            this.dialogContainerRef.instance.afterClosed.subscribe((result: T) => {
                this.destroyComponent(this.dialogContainerRef);
                this.destroyComponent(contentComponentRef);
                resolve(result); // Resolve when dialog closes
            });
        });
    }

    private createDialogContainer(): ComponentRef<DialogComponent> {
        const dialogContainerRef = createComponent(DialogComponent, {
            environmentInjector: this.appRef.injector,
        });

        this.appRef.attachView(dialogContainerRef.hostView);
        document.body.appendChild(dialogContainerRef.location.nativeElement);

        (dialogContainerRef?.instance as any).open(); // Open the dialog container immediately
        return dialogContainerRef;
    }

    private createContentComponent(component: any, data?: any): ComponentRef<any> {
        const contentComponentRef = createComponent(component, {
            environmentInjector: this.appRef.injector,
        });

        // Pass data to the content component
        const contentInstance = contentComponentRef.instance as any;
        if (data) {
            Object.assign(contentInstance, data);
        }

        this.appRef.attachView(contentComponentRef.hostView);
        return contentComponentRef;
    }

    private destroyComponent(componentRef: ComponentRef<any>) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }
}
