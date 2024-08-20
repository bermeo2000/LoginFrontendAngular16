import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginData = {
    "username": '',
    "password": '',
  }


  constructor(
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  /* formSubmit(){
    if (this.loginData.username.trim() === '' || this.loginData.username.trim() === null) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: 'El nombre de usuario es requerido !!',
        life: 3000
      });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: 'El nombre de usuario es requerido !!',
        life: 3000
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);

        this.loginService.loginUser(data.token)
        this.loginService.getCurrentUser().subscribe((user: any) =>{
          console.log(user)
        })
  },(error)=>{
  console.log(error);
})
} */


  formSubmit() {
   
    if (this.loginData.username.trim() === '' || this.loginData.username.trim() === null) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: 'El nombre de usuario es requerido !!',
        life: 3000
      });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: 'El nombre de usuario es requerido !!',
        life: 3000
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          console.log(user);

          if (this.loginService.getUserRole() == 'ADMIN') {
            //dashboard admin
            //window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else if (this.loginService.getUserRole() == 'USER') {
            //user dashboard
            //window.location.href = '/user-dashboard';
            this.router.navigate(['user-dashboard']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else {
            this.loginService.logout();
          }
        })
      }, (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'warn',
          summary: 'Error',
          detail: 'Detalles inválidos , vuelva a intentarlo!',
          life: 3000
        });
      }
    )
  }
}