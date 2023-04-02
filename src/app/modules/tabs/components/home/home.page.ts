import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../../../shared/service/item.service";
import {Item} from "../../../../shared/interfaces/item";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{
  items: Item[];
  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItem().subscribe((res) => {
      this.items = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as Item
        };
      })
    });
  }

}
