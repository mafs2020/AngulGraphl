import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { IUsuario } from '../interfaces/IUsuario';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from 'src/app/services/modal.service';

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
  constructor(
    private apollo: Apollo,
    private modalServices: ModalService
    ) { }

  ngOnInit() {
    this.usuariosAll();
    this.modalServices.eliminarUsuario.subscribe(id => this.usuarios = this.usuarios.filter(user => user.id != id));
  }
  usuariosAll(){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: Usuarios
    }).valueChanges.subscribe(({data, loading}) => {
      console.log('aqui');
      this.usuarios = data.usuarios;
      this.total = data.total;
      console.log(data);
      this.loading = loading;
      this.currentUser = data.currentUser;
    });
  }
  cambiar(){    
    this.modalServices.mostrarModal = !this.modalServices.mostrarModal;
    console.log('llego');
  }
  eliminar(id: string): void{
    this.modalServices.data.emit(id);
    // muestra el modal
    this.modalServices.mostrarModal = !this.modalServices.mostrarModal;
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
