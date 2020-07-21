import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {UserService} from "../services/user.service";
import {User} from "../../_models";


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  error = '';
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private uerService: UserService) {
  }

  ngOnInit() {
    if(!window.localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    let userId = window.localStorage.getItem("editUserId");
    if (!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roles: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      cin: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      dateOfHire: ['', Validators.required],
      placeOfBirth: ['', Validators.required]
    });
    this.loading = true;
    this.uerService.getUserById(+userId)
      .subscribe(data => {
          this.editForm.setValue(data);
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
          alert(error);
        });
  }

  get f() { return this.editForm.controls; }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.uerService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          alert('User updated successfully.');
          this.router.navigate(['list-user']);
        },
        error => {
          this.error = error;
          this.loading = false;
          alert(error);
        });
  }

}
