import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../../../shared/service/item.service";
import {Item} from "../../../../shared/interfaces/item";
import {ScrollDetail} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{
  items: Item[];
  showToolbar = false;
  constructor(private itemService: ItemService) {}

  ngOnInit(): void {}

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 225;
    }
  }

}
