import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  navbarOpen = false;
  constructor() { }

  ngOnInit() {
  }

  toggleNavbar(): void{
    this.navbarOpen = !this.navbarOpen;
  }

}
