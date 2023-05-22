import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  tarotStartPath = "/tarot"


  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {

  }

  notTarot(): boolean {
    return !this.router.url?.startsWith(this.tarotStartPath);
  }
}
