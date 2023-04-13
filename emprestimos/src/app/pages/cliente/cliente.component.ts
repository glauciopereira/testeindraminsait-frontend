import { Component, OnInit} from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { ICliente } from 'src/app/interface/cliente';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  clientes: ICliente[] = [];
  constructor(private clientesServices: ClienteService, private clienteService: ClienteService){


  }

  cpfcliente = 0;
  ngOnInit() {

      this.clientesServices.buscarTodosClientes().subscribe((result: any) => {
        this.clientes = result
    });


  }


  delete(cpf: number){
    Swal.fire({
      title: 'Tem certeza que deseja excluir este cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
    this.clienteService.deletaCliente(cpf).subscribe(result => {
      this.clientes = this.clientes.filter(c => c.cpf !== cpf);
    });
  }
    });

  }

}
