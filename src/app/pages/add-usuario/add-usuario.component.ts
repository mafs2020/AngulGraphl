import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { IUsuario } from '../interfaces/IUsuario';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from "@angular/forms";
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

const crearUsario = gql`
mutation AddUSer($input: UsuarioInput) {
  usuario: register(input: $input) {
    id
    nombre
    edad
  }
}
`;

function compararPassword(c: AbstractControl): { [key: string]: boolean } | null {
  const password1 = c.get('password1');
  const password2 = c.get('password2');
  // console.log(password1,password2);
  if( password1.pristine || password2.pristine ){
    return null;
  }
  if( password1.value === password2.value ){
    return null;
  } else {
    return { 'igual': true };
  }
}


@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {
  formUsuario: FormGroup;
  usuario: IUsuario;
  querySubscription: Subscription;
  constructor(
    private router: Router,
    private apollo: Apollo,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.formUsuario.get('comparar.password2').valueChanges.pipe( debounceTime(1000) ).subscribe( () => this.formUsuario.get('comparar').setValidators(compararPassword) );
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
  onSubmit(){
    console.log( this.formUsuario.value  );
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

  crearUsuario(){
    this.apollo.mutate({
      mutation: crearUsario,
      variables: {
        input: {nombre: this.formUsuario.get('nombre').value, edad: this.formUsuario.get('edad').value, password: this.formUsuario.get('comparar.password1').value}
      }
    }).subscribe(({ data }) => {
      console.log(data);
      this.router.navigate(['/']);
    },(error) => {
      console.log(error);
    });
  }

  ngOnDestroy() {
    // this.querySubscription.unsubscribe();
  }

}
