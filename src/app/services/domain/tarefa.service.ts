import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { TarefaDTO } from "../../models/tarefa.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class TarefaService {
     
    constructor(
        public http: HttpClient,
        public storage: StorageService) {

    }

    findAll(rotinaid): Observable<TarefaDTO[]> {
        return this.http.get<TarefaDTO[]>(`${API_CONFIG.baseUrl}/tarefas?id=${rotinaid}`);
    }

    insert(tarefa: TarefaDTO, rotinaid) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/tarefas?id=${rotinaid}`,
            tarefa, 
            { 
                observe: 'response', 
                responseType: 'text'
            });
    }

    update(tarefa: TarefaDTO) {
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});

        return this.http.put(
            `${API_CONFIG.baseUrl}/tarefas/${tarefa.id}`,
            tarefa,
            {'headers': authHeader});
    }

    delete(id) {
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});

        return this.http.delete(
            `${API_CONFIG.baseUrl}/tarefas/${id}`,
            {'headers': authHeader}
        );
    }
}