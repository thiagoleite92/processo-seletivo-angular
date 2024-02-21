import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClincDTO } from 'src/app/dtos/clinc.dto';
import { RoutesEnum } from 'src/app/enums/routes.enum';
import { ClincService } from 'src/app/services/clinc.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  clinics: ClincDTO[] = [
    {
      id: 2,
      name: 'Clinca exemplo A',
      phone: '81994381298',
      ownerName: 'Avelino Alonso',
      cep: '52020213',
      uf: 'PE',
      city: 'Recife',

      neighborhood: 'Espinheiro',
      street: 'Rua do Espinheiro',
      number: '190',
      complement: 'Ao lado esquerdo, placa da Clin'
    },
    {
      id: 3,
      name: 'Clinca exemplo B',
      phone: '819948301',
      ownerName: 'Pedro Henrique',
      cep: '52020213',
      uf: 'PE',
      city: 'Recife',

      neighborhood: 'Espinheiro',
      street: 'Rua do Espinheiro',
      number: '160',
      complement: 'Ao lado esquerdo, placa da Clin'
    },
    {
      id: 4,
      name: 'Clinca exemplo C',
      phone: '819948301',
      ownerName: 'Antonio',
      cep: '52020200',
      uf: 'PE',
      city: 'Recife',

      neighborhood: 'Espinheiro',
      street: 'Rua do Espinheiro',
      number: '160',
      complement: 'Ao lado esquerdo, placa da Clin'
    }
  ]

  constructor(
    private clincService: ClincService,
    private toastService: ToastService,
    private route: Router,
  ){}

  ngOnInit(): void {
    this.clincService.getAllClincs().subscribe({
      next: (value: any[]) => {
        console.log(value);
      },
      error: (err: any) => {
        this.toastService.showError(`Erro ao resgatar listagem de clínicas`);
      }
    });
  }

  redirectNewClinc(){
    this.route.navigate([RoutesEnum.SESSION_NEW_CLINC]);
  }

  edit(clincId: any){
    console.log(`Id da clínica: ${clincId}`);
    this.route.navigate([`${RoutesEnum.SESSION_CLINC_INFO}/${clincId}`])
  }

  delete(clincId: any){
    console.log(`Id da clínica: ${clincId} para deletar`);
  }

}
