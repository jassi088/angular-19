import { Component, Input, TemplateRef, ElementRef, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy {
  @Input() triggerTemplate!: TemplateRef<{ toggleMenu: () => void }>;

  isMenuOpen = false;
  private documentClickListener: () => void;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.documentClickListener = this.renderer.listen('document', 'click', this.handleOutsideClick.bind(this));
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
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
