import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

const EliminarUsuario = gql`
mutation deleteUser($id: ID) {
  usuario: eliminarUsuario(id: $id) {
    id
    nombre
    edad
  }
}
`;


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  id: string = '';
  querySubscription: Subscription;
  constructor(
    private modalServices: ModalService,
    private apollo: Apollo
    ) { }

  ngOnInit() {
    this.modalServices.data.subscribe(data => {
      this.id = data;
      console.log( this.id );
    });
  }

  cambiar(){
    this.modalServices.mostrarModal = !this.modalServices.mostrarModal;
  }
  mutationDeleteGrpahql(){
    this.apollo.mutate({
      mutation: EliminarUsuario,
      variables: {
        id: this.id,
      }
    }).subscribe(({ data }) => {
      console.log(data);
    },(error) => {
      console.log(error);
    },() => this.modalServices.mostrarModal = !this.modalServices.mostrarModal);
  }

}
