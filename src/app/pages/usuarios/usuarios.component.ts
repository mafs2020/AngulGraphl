import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { IUsuario } from '../interfaces/IUsuario';

const Usuarios = gql`
query TotalUsuarios {
  total
  usuarios: allUsuario(id:10) {
    id
    nombre
    edad
    password
  }
}
`;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  loading: boolean;
  currentUser: any;
  navbarOpen = false;
  usuarios: IUsuario[] = [];
  total: number;
  private querySubscription: Subscription;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: Usuarios
    }).valueChanges.subscribe(({data, loading}) => {
      this.usuarios = data.usuarios;
      this.total = data.total;
      console.log(data);
      this.loading = loading;
      this.currentUser = data.currentUser;
    });
  }

  toggleNavbar(): void{
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
