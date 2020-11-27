import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http"
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";
import { UsuarioService } from "./domain/usuario.service";


@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        public usuarioService: UsuarioService) {

    }

    autenticacao(creds: CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`,
        creds,
        {
            observe: 'response',
            responseType: 'text'
        });
    }

    // refreshToken() {
    //     return this.http.post(`${API_CONFIG.baseUrl}/auth/refreshToken`,
    //     {},
    //     {
    //         observe: 'response',
    //         responseType: 'text'
    //     });
    // }

    sucessfulLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7);
        let user: LocalUser = {
            token: tok,
            id: this.jwtHelper.decodeToken(tok).sub.substring(3,4),
            email: this.jwtHelper.decodeToken(tok).sub.substring(12)
        };
        this.storage.setLocalUser(user);
        // this.usuarioService.findByEmail(this.storage.getLocalUser().email)
        //     .subscribe(resp => {
        //         this.storage.setUsuarioLogado(resp);
        //     }, error => {});
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}