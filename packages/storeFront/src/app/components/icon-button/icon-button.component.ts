import { Component, Input } from '@angular/core';

export enum IconOptions {
  HOME = 'HOME',
  CART = 'CART',
  ADD = 'ADD',
  CARD = 'CARD',
}

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
  @Input() iconOption: IconOptions = IconOptions.ADD;
  @Input() strokeColor = 'black';
  @Input() buttonText = '';
  @Input() disabled = false;
  iconEnum = IconOptions;

  constructor() {}
}
