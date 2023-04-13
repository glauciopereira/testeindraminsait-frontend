import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { ICliente } from '../interface/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  endpoint = 'clientes';
  api = environment.api;
  constructor(private http: HttpClient) { }

  buscarTodosClientes(){
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoint}`);
  }

  cadastrarCliente(cliente : ICliente){
    return this.http.post<ICliente[]>(`${this.api}/${this.endpoint}`, cliente);
  }

  atualizarCliente(cliente : ICliente){
    const cpf = cliente.cpf;
    return this.http.put(`${this.api}/${this.endpoint}/${cpf}`, cliente);
  }

  deletaCliente(cpf : number){
    return this.http.delete<ICliente>(`${this.api}/${this.endpoint}/${cpf}`);
  }

  buscarCLientePorCpf(cpf : number){
    return this.http.get<ICliente>(`${this.api}/${this.endpoint}/${cpf}`);
  }


}
