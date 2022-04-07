import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plus-icon',
  templateUrl: './plus-icon.component.html',
  styleUrls: [
    './plus-icon.component.scss',
    '../product/product.component.scss',
  ],
})
export class PlusIconComponent implements OnInit {
  @Input() strokeColor = 'black';

  constructor() {}

  ngOnInit(): void {}
}
