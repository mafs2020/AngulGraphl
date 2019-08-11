import { Injectable, EventEmitter } from '@angular/core';
import { IUsuario } from '../pages/interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public mostrarModal = false;
  data: EventEmitter<string> = new EventEmitter();
  eliminarUsuario: EventEmitter<String> = new EventEmitter();
  usuarioEmit: EventEmitter<IUsuario> = new EventEmitter();
  constructor() { }
}
