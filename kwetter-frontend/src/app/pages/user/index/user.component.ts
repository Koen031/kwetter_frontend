import {Component, Input, OnInit,Output,EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import {JwtDataSource} from '../../../data-source/jwt.data-source';
import {JwtHttp} from 'angular2-jwt-refresh';
import {environment} from '../../../../environments/environment';
import {ViewCell, LocalDataSource} from 'ng2-smart-table';
import swal from 'sweetalert2';

import {UserService} from './user.service';

@Component({
  selector: 'active',
  template: `
    <span *ngIf="active">Actief</span>
    <span *ngIf="!active">Inactief</span>
  `,
})
export class ActiveComponent implements ViewCell, OnInit {

  active: boolean;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
    if (this.rowData.active)
      this.active = this.rowData.active;
    else
      this.active = false;
  }

}

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit{
  settings = {
      mode: 'external',
      columns: {
        username: {
          title: 'Gebruikersnaam',
        },
        email: {
          title: 'Email',
        },
        firstname: {
          title: 'Voornaam',
        },
        middlename: {
          title: 'Tussenvoegsel',
        },
        lastname: {
          title: 'Achternaam',
        },
        active: {
          title: 'Actief',
          type: 'custom',
          filter: {
            type: 'list',
            config: {
              selectText: 'Maak een keuze',
              list: [
                { value: 0, title: 'Inactief'},
                { value: 1, title: 'Actief'},
              ],
            },
          },
          renderComponent: ActiveComponent
        },
        // actions: {
        //   title: 'Acties',
        //   type: 'custom',
        //   filter: false,
        //   sort: false,
        //   renderComponent: UserActionButtonsComponent,
        // },
      },
      delete: {
        deleteButtonContent:'<span class="btn btn-raised btn-emkes"><i class="ft-x"></i></span>',
        confirmDelete: true,
      },
      edit: {
        editButtonContent: '<span class="btn btn-raised btn-emkes"><i class="ft-edit-2"></i></span>',
        confirmEdit: true,
      },
      actions: {
        add: false,
        edit: true,
        delete: true,
        position: 'right',
        columnTitle: 'Acties',
      },
      pager: {
        display: true,
        perPage: 10
      }
    };

    source: JwtDataSource;

    deleteConfirm(event){
      let thiz = this;
      swal({
          title: "Gebruiker verwijderen",
          text: "Weet je zeker dat je deze gebruiker definitief wilt verwijderen?",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Ja",
          cancelButtonText: "Nee",
        })
        .then((response) => {
          if(response.value == true){
            var userId = event.data.id;
            this.userService.deleteUser(userId).subscribe(response => {
              swal({ title: response.title, text: response.message, type: "success" }).then(function () {
                event.confirm.resolve();
                // location.reload();
              });
            },
            error => {
              swal(error.message, "error");
            });
          }
        });
    }

    confirmEdit(event){
      var userId = event.data.id;
      this.router.navigate(['/user/update',userId]);
    }


    constructor(
      jwtHttp: JwtHttp,
      private router: Router,
      private userService: UserService
    ) {
      this.source = new JwtDataSource(
        jwtHttp,
        {
          endPoint: environment.server + '/user/paginate',
          dataKey: 'data'
        }
      );
    }

    ngOnInit(): void {

   }
}