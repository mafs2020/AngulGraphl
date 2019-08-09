import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap, debounceTime } from "rxjs/operators";
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { IUsuario } from '../interfaces/IUsuario';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from "@angular/forms";

function compararPassword(c: AbstractControl): { [key: string]: boolean } | null {
  const password = c.get('password1');
  const passwordConfirm = c.get('password2');
  // console.log(password.value, passwordConfirm.value);
  
  if (password.pristine || passwordConfirm.pristine){
    return null;
  }
  if(password.value === passwordConfirm.value){
    return null;
  } else {
    return { 'igual': true };
  }
}


const UsuarioQuery = gql`
query Usuario($id: ID!) {
  usuario: usuario(id:$id) {
    id
    nombre
    edad
  }
}
`;

const actualizarUserMutation = gql`
mutation updateUSer($id: ID, $input: UsuarioInput) {
  usuario: updateUsuario(id:$id, input: $input) {
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
  formUsuario: FormGroup;
  id: string;
  usuario: IUsuario;
  querySubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.has('id')){
      this.id = this.route.snapshot.paramMap.get('id');
    }
    this.queryGrpahql();
    this.iniciarFormulario();
    this.formUsuario.get('comparar.password2').valueChanges.pipe( debounceTime(1000) ).subscribe(() => {
      //asignas el validador o la funcion
      // require un validador ya echo o uno que haces tu
      // newValidator: ValidatorFn | ValidatorFn[]
      // (method) AbstractControl.setValidators(newValidator: ValidatorFn | ValidatorFn[]): void
      // ejemplo
      // phone.setValidators(Validators.required)
      this.formUsuario.get('comparar').setValidators(compararPassword);
      // despues actualizamos los validadores
      this.formUsuario.updateValueAndValidity();
      this.formUsuario.get('comparar').updateValueAndValidity();
    });
  }

  queryGrpahql(){
    this.querySubscription = this.apollo
      .watchQuery({
        query: UsuarioQuery,
        variables: {
          id: this.id,
        },
      })
      .valueChanges.subscribe(({data}: any) => {
        // console.log(data.usuario);
        this.usuario = data.usuario;
        this.setFormulario();
      });
  }

  iniciarFormulario(){
    this.formUsuario = this.fb.group({
      nombre: ['', [Validators.required]],
      edad: [null, [Validators.required, Validators.min(18), Validators.max(50)]],
      tel: '',
      telOEmail: '',
      comparar: this.fb.group({
        password1: ['', Validators.required],
        password2: ['', Validators.required]
      }),
      direccionesForm: this.fb.array([this.direcciones()]),
    // }, { 'validators': compararPassword })
    });
  }

  direcciones(): FormGroup {
    return this.fb.group({
      calle: [''],
      ciudad: '',
      estado: ''
    });
  }

  addDireccion(): void {
    //aqui accesas al getter de direcciones
    this.direccionGET.push(this.direcciones());
  }

  
  get direccionGET(): FormArray {
    // tienes que acceder al valor del formGroup original
    // para regresar su valor total me imagino que el largo del arreglo
    return <FormArray>this.formUsuario.get('direccionesForm');
  }
  setFormulario(){
    this.formUsuario.patchValue( {nombre: this.usuario.nombre, edad: this.usuario.edad} );
  }

  onSubmit(){
    console.log( this.formUsuario.value  );
    this.updateUsuario();
  }
  validaciones(data?: string){
    console.log(data);
    
    const telOEmail = this.formUsuario.get('telOEmail');
    if(data == 'Telefono'){
      console.log('entro');
      // console.log(telOEmail);
      telOEmail.setValidators(Validators.required);
    } else {
      telOEmail.clearValidators();
    }
    telOEmail.updateValueAndValidity();
  }

  updateUsuario(){
    this.apollo.mutate({
      mutation: actualizarUserMutation,
      variables: {
        id: this.id,
        input: {nombre: this.formUsuario.get('nombre').value, edad: this.formUsuario.get('edad').value, password: this.formUsuario.get('comparar.password1').value}
      }
    }).subscribe(({ data }) => {
      console.log(data);
      this.router.navigate(['/']);
    },(error) => {
      console.log('there was an error sending the query', error);
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
// (ngSubmit)="onSubmit()"