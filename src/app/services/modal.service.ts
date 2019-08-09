import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public mostrarModal = false;
  data: EventEmitter<string> = new EventEmitter();
  constructor() { }
}
