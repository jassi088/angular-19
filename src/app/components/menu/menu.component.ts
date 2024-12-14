import { Component, Input, Output, EventEmitter, TemplateRef, ElementRef, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy {
  @Input() menuItems: { label: string; value: string }[] = [];
  @Input() triggerTemplate!: TemplateRef<{ toggleMenu: () => void }>;
  @Output() menuSelect = new EventEmitter<string>();

  isMenuOpen = false;
  private documentClickListener: () => void;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.documentClickListener = this.renderer.listen('document', 'click', this.handleOutsideClick.bind(this));
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectMenuItem(item: string) {
    this.menuSelect.emit(item);
    this.isMenuOpen = false;
  }

  handleOutsideClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isMenuOpen = false;
    }
  }

  ngOnDestroy() {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
  }
}
