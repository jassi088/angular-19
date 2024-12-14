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

    constructor(
        private injector: Injector,
        private appRef: ApplicationRef
    ) { }

    open<T>(component: any, data?: any): Promise<T> {
        this.dialogContainerRef = this.createDialogContainer();

        const contentComponentRef = this.createContentComponent(component, data);

        return new Promise((resolve) => {
            // Manually trigger change detection for the entire application
            this.appRef.tick(); // This will trigger change detection for the application

            // Now, after the dialog is rendered, append the content component inside the dialog
            const dialogContentElement = this.dialogContainerRef.location.nativeElement.querySelector('.dialog-content');
            if (dialogContentElement) {
                dialogContentElement.appendChild(contentComponentRef.location.nativeElement); // Append the content inside dialog
            } else {
                throw new Error('Dialog content element not found.');
            }

            // Handle closing logic
            contentComponentRef.instance.closed.subscribe((result: T) => {
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

        (dialogContainerRef?.instance as any).open(); // Open the dialog immediately
        return dialogContainerRef;
    }

    private createContentComponent(component: any, data?: any): ComponentRef<any> {
        const contentComponentRef = createComponent(component, {
            environmentInjector: this.appRef.injector,
        });

        // Pass data to the content component if available
        const contentInstance = contentComponentRef.instance as any;
        if (data) {
            Object.assign(contentInstance, data); // Assign the data to the component instance
        }

        // Attach the content component view to the application
        this.appRef.attachView(contentComponentRef.hostView);

        return contentComponentRef;
    }

    private destroyComponent(componentRef: ComponentRef<any>) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }
}
