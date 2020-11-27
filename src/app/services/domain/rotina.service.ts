import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { RotinaDTO } from "../../models/rotina.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class RotinaService {
     
    constructor(
        public http: HttpClient,
        public storage: StorageService) {

    }

    findAll(): Observable<RotinaDTO[]> {
        return this.http.get<RotinaDTO[]>(`${API_CONFIG.baseUrl}/rotinas?id=${this.storage.getLocalUser().id}`);
    }

    insert(rotina:RotinaDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/rotinas?id=${this.storage.getLocalUser().id}`,
            rotina, 
            { 
                observe: 'response', 
                responseType: 'text'
            });
    }

    delete(id) {
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});

        return this.http.delete(
            `${API_CONFIG.baseUrl}/rotinas/${id}`,
            {'headers': authHeader}
        );
    }
}