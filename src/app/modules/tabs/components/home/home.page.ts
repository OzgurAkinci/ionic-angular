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

  ngOnInit(): void {}

}
