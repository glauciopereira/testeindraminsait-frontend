import { Component } from '@angular/core';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICliente } from 'src/app/interface/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

    clienteForm = new FormGroup({

        cpf: new FormControl(0, Validators.required),
        nome: new FormControl('', Validators.required),
        rendimentoMensal: new FormControl(0, Validators.required),
        ddd: new FormControl(0, Validators.required),
        numTelefone: new FormControl(0, Validators.required),
        logradouro: new FormControl('', Validators.required),
        numero: new FormControl(0, Validators.required),
        cep: new FormControl('', Validators.required),
        complemento: new FormControl('', Validators.required)
    });

    constructor(private clienteService: ClienteService, private route: ActivatedRoute, private router: Router){}

    cpfcliente = 0;
    ngOnInit(){
      this.cpfcliente = Number(this.route.snapshot.paramMap.get('cpf'));
      if(this.cpfcliente){
        this.clienteService.buscarCLientePorCpf(this.cpfcliente).subscribe((cliente: ICliente) => {
          this.clienteForm.setValue({
            cpf: cliente.cpf || 0,
            nome: cliente.nome || '',
            rendimentoMensal: cliente.rendimentoMensal || 0,
            ddd: cliente.ddd || 0,
            numTelefone: cliente.numTelefone || 0,
            logradouro: cliente.logradouro || '',
            numero: cliente.numero || 0,
            cep: cliente.cep || '',
            complemento: cliente.complemento || ''
          })

        });

      }

    }

    cadastrar(){
      const cliente: ICliente = this.clienteForm.value as ICliente;
      this.clienteService.cadastrarCliente(cliente).subscribe(result => {
        Swal.fire('Sucesso ao salvar cliente!', 'Salvo na base', 'success')
        this.router.navigate(['/clientes']);

      })

    }

    alterar(){
      const cliente: ICliente = this.clienteForm.value as ICliente;
      this.clienteService.atualizarCliente(cliente).subscribe(result => {
        Swal.fire('Sucesso ao atualizar cliente!', 'Salvo na base', 'success')
        this.router.navigate(['/clientes']);

      })
    }


    handleSubmit() {
      if (this.clienteForm.valid) {
        if (this.cpfcliente) {
          this.alterar();
        } else {
          this.cadastrar();
        }
      }
    }

}
