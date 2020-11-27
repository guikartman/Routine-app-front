import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { SubTarefaDTO } from "../../models/subtarefa.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class SubTarefaService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {

    }

    findAll(tarefaid): Observable<SubTarefaDTO[]> {
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});

        return this.http.get<SubTarefaDTO[]>(`${API_CONFIG.baseUrl}/subtarefas?id=${tarefaid}`, {'headers': authHeader});
    }

    insert(subtarefa: SubTarefaDTO, tarefaid) {
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({
            'Authorization' : 'Bearer ' + token
        });

        console.log(subtarefa);

        return this.http.post(
            `${API_CONFIG.baseUrl}/subtarefas?id=${tarefaid}`,
            subtarefa,
            {
                headers: authHeader,
                observe: 'response', 
                responseType: 'text'
            });
    }

    update(subtarefa: SubTarefaDTO) {
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});

        return this.http.put(
            `${API_CONFIG.baseUrl}/subtarefas/${subtarefa.id}`,
            subtarefa,
            {'headers': authHeader});
    }

    delete(id) {
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});

        return this.http.delete(
            `${API_CONFIG.baseUrl}/subtarefas/${id}`,
            {'headers': authHeader}
        );
    }
}