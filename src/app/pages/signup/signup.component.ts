import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  value!: string;


  usuarioForm!: FormGroup;
  usuarios: Usuario[] = [];
  imageBase64: string | ArrayBuffer | null = null;

    constructor(
      private fb: FormBuilder, 
      private router: Router,
      private userService: UserService,
    ) 
      {
      this.usuarioForm = this.fb.group({
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        imagen: ['',],
        username: ['', [Validators.required]],
      });
    }


  ngOnInit(): void {
   /*  this.getUsuarios(); */
  }

/*   getUsuarios(): void {
    this.userService.getAllUsuarios().subscribe(
      data => {
        this.usuarios = data;
        console.log(this.usuarios)
      }
    )
  } */


    registro(): void {
      const username = this.usuarioForm.get('username')?.value;
  
      if (!username) {
        Swal.fire({
          icon: 'error',
          title: 'NombreUsuario ya existe',
          text: 'Puede usar otro nombre de usuario.'
        });
        return;
      }
  
  
  
      const newMarca = this.usuarioForm.value;
      this.userService.añadirUsuario(newMarca).subscribe({
        next: () => {
          this.router.navigate(['/home']);
          Swal.fire({
            icon: 'success',
            title: 'Usuario guardada!',
            text: 'La nueva Usuario se ha guardado correctamente.'
          }).then(() => {
            this.usuarioForm.reset();  // Limpia el formulario
          });
        },
        error: error => {
          console.error('Error al guardar la marca:', error);
          Swal.fire({
            icon: 'error',
            title: 'NombreUsuario ya existe',
            text: 'Puede usar otro nombre de usuario.'
          });
        }
      });
    }



  onFileChange(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = reader.result;
        this.usuarioForm.controls['imagen'].setValue(this.imageBase64);
      };
      reader.readAsDataURL(file); // Convierte el archivo a Base64
    }
  }


}
