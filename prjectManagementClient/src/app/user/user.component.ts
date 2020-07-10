import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  public users = [
    {username:"omarB",firstName:"omar",lastName:"bouchaala",tel:"27051311"},
    {username:"omarB",firstName:"omar",lastName:"bouchaala",tel:"27051311"},
    {username:"omarB",firstName:"omar",lastName:"bouchaala",tel:"27051311"},
    {username:"omarB",firstName:"omar",lastName:"bouchaala",tel:"27051311"},
    {username:"omarB",firstName:"omar",lastName:"bouchaala",tel:"27051311"},
    {username:"omarB",firstName:"omar",lastName:"bouchaala",tel:"27051311"},
    {username:"omarB",firstName:"omar",lastName:"bouchaala",tel:"27051311"},
    {username:"omarB",firstName:"omar",lastName:"bouchaala",tel:"27051311"},
    {username:"omarB",firstName:"omar",lastName:"bouchaala",tel:"27051311"},
    {username:"omarB",firstName:"omar",lastName:"bouchaala",tel:"27051311"}
  ];


  constructor() { }

  ngOnInit(): void {

    console.log("hello everyone");



    // let exampleId: any = $('#user_table');
    // this.tableWidget = exampleId.DataTable({
    //   select: true
    // });


  }

}
