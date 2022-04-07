import { Component, OnInit } from '@angular/core';
import { IconOptions } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  iconOptions = IconOptions;
  constructor() {}

  ngOnInit(): void {}
}
