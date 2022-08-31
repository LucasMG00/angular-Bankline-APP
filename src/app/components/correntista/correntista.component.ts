import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CorrentistaService } from 'src/app/services/correntista.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-correntista',
  templateUrl: './correntista.component.html',
  styleUrls: ['./correntista.component.css']
})
export class CorrentistaComponent implements OnInit, OnDestroy {
  correntistas: any;
  cpf: any;
  nome: any;
  constructor(
    private correntistaService: CorrentistaService, 
    public toastService: ToastService,
  ) { }
  ngOnInit(): void {
    this.exibirCorrentistas();
  }
  exibirCorrentistas(): void {
    this.correntistaService.list()
      .subscribe(
        data => {
          this.correntistas = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  save(): void {
    const correntista = {
      cpf: this.cpf,
      nome: this.nome
    };
    console.log(correntista);
    this.correntistaService.create(correntista)
      .subscribe(
        response => {
          console.log(response);
          this.exibirCorrentistas();
        },
        error => {
          console.log(error);
        });
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }

  showSuccess(addTpl: string | TemplateRef<any>) {
    this.toastService.show(addTpl, { classname: 'bg-success text-light', delay: 5000 });
  }
}