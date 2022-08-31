import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CorrentistaService } from 'src/app/services/correntista.service';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-movimentacao-new',
  templateUrl: './movimentacao-new.component.html',
  styleUrls: ['./movimentacao-new.component.css']
})
export class MovimentacaoNewComponent implements OnInit, OnDestroy {
  correntistas:any;
  correntista:any;
  valor:any;
  descricao:any;
  tipo:any;
  dataHora:any;

  constructor(
    private movimentacaoService: MovimentacaoService,
    private correntistaService: CorrentistaService,
    public toastService: ToastService
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
    console.log(this.correntista)
    const movimentacao = {
      valor:this.valor,
      descricao:this.descricao,
      tipo:this.tipo,
      idConta:this.correntista.id,
      dataHora:this.dataHora

    };
    console.log(movimentacao);
    this.movimentacaoService.create(movimentacao)
      .subscribe(
        response => {
          console.log(response);
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
