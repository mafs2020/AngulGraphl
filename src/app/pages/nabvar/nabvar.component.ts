import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css']
})
export class NabvarComponent implements OnInit {
  navbarOpen = false;
  constructor() { }

  ngOnInit() {
  }
  toggleNavbar(): void{
    this.navbarOpen = !this.navbarOpen;
  }

}
