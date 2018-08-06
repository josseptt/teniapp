import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersRole} from '../../../models/users-role';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {RoleService} from '../../../services/role.service';
import {UserDialogComponent} from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  idSelected: number = 0;

  column: string[] = ['select', 'id', 'username', 'email', 'role', 'firstName', 'lastName'];

  elementUser: UsersRole[];

  dataSourceUser: any;

  selectUser = new SelectionModel<UsersRole>(true, []);

  @ViewChild('userSort') userSort: MatSort;
  @ViewChild('userPaginator') userPaginator: MatPaginator;

  constructor(public roleService: RoleService, public dialog: MatDialog) { }

  ngOnInit() {
    this.roleService.usersList().then((data: any[]) => {
      this.elementUser = data;
      this.dataSourceUser = new MatTableDataSource<UsersRole>(this.elementUser);
      this.dataSourceUser.paginator = this.userPaginator;
      this.dataSourceUser.sort = this.userSort;
    });
  }

  search(filterValue: string) {
    this.dataSourceUser.filter = filterValue.trim().toLowerCase();
  }

  selectedUserRow(row) {
    if (this.selectUser.selected.length > 0) {
      this.selectUser.clear();

      if (this.idSelected !== row.id) {
        this.selectUser.toggle(row);
        this.idSelected = row.id;
      } else {
        this.idSelected = 0;
      }
    } else {
      this.selectUser.toggle(row);
      this.idSelected = row.id;
    }
  }

  insert() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '650px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  assign() {

  }

  delete() {

  }
}
