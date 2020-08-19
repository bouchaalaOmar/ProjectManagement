import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {first} from "rxjs/operators";
import {JSON_CONFIG_FILENAME} from "tslint/lib/configuration";
@Component({
  selector: 'app-add-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {}

  updateProfileForm: FormGroup;
  updatePasswordForm: FormGroup;
  error = '';
  loading = false;
  submitted = false;
  roles: any;
  userInfo :any;
  ChangePasswordSelected = false;
  newPassword = {"email":"", "password": ""};

  ngOnInit() {
    this.userInfo = JSON.parse(window.localStorage.getItem('currentUser')).info;
    if (!this.userInfo) {
      this.router.navigate(['login']);
      return;
    }
    this.updateProfileForm = this.formBuilder.group({
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
    this.updateProfileForm.setValue(this.userInfo);

    this.updatePasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required,Validators.minLength(8)],
      confirmPassword: ['', Validators.required]
    },{
      validator: this.MustMatch('newPassword', 'confirmPassword')
    })
  }

  get f() {return this.updateProfileForm.controls;}
  get f1() {return this.updatePasswordForm.controls;}

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.userService.updateUser(this.updateProfileForm.value)
      .pipe(first())
      .subscribe(
        data => {
          alert('User updated successfully.');
          this.userInfo = this.updateProfileForm.value;
          let userStorage = JSON.parse(window.localStorage.getItem('currentUser'));
          userStorage.info = this.updateProfileForm.value;
          window.localStorage.setItem('currentUser',JSON.stringify(userStorage));
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
          alert(error);
        });
  }

  onUpdatePassword(){
    this.submitted = true;
    this.loading = true;
    this.newPassword.email = this.userInfo.email;
    this.newPassword.password = this.updatePasswordForm.value.newPassword;
    this.userService.updatePassword(this.newPassword)
      .pipe(first())
      .subscribe(
        data => {
          alert("Password updated successfully")
          this.ChangePasswordSelected = false;
        }
      )

  }

   MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
