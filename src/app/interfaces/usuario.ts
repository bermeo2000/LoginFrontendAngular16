export interface Usuario {
    usuarioId: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    telefono: string;
    imagen: string | ArrayBuffer;
    estado: boolean;
    username: string;
}
