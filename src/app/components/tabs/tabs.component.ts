import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'app-tabs',
  standalone: false,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  @Input() activeTabTitle = '';
  @Output() activeTabChange = new EventEmitter<string>();

  ngAfterContentInit() {
    const activeTab = this.tabs.find(
      (tab) => tab.title === this.activeTabTitle
    ) || this.tabs.first;

    this.activateTab(activeTab);
  }

  activateTab(tab: TabComponent | undefined) {
    if (tab) {
      this.tabs.forEach((t) => (t.active = false)); // Deactivate all tabs
      tab.active = true; // Activate the selected tab
      this.activeTabChange.emit(tab.title); // Emit active tab title
    }
  }
}
