import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { IUsuario } from '../interfaces/IUsuario';

const UsuarioQuery = gql`
query Usuario($id: ID!) {
  usuario: usuario(id:$id) {
    id
    nombre
    edad
  }
}
`;

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit, OnDestroy {
  id: string;
  usuario: IUsuario;
  querySubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo
  ) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.has('id')){
      this.id = this.route.snapshot.paramMap.get('id');
    }
    this.queryGrpahql();
  }

  queryGrpahql(){
    this.querySubscription = this.apollo
      .watchQuery({
        query: UsuarioQuery,
        variables: {
          id: this.id,
        },
      })
      .valueChanges.subscribe(({data}) => {
        console.log(data);
        
        // this.currentUser = data.currentUser;
      });
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}





// this.hero$ = this.route.paramMap.pipe(
//   switchMap((params: ParamMap) =>
//     this.service.getHero(params.get('id')))
// );