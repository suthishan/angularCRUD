import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/User';
import { CrudService } from './../../service/crud.service';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  
  Users:any = [];
  // users: User = [];
  constructor(private crudService: CrudService) { }
  ngOnInit(): void {
    this.crudService.GetUsers().subscribe(res => {
      console.log(res)
      this.Users = res;
    });    
  }
  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteUser(id).subscribe((res) => {
        this.Users.splice(i, 1);
      })
    }
  }
}