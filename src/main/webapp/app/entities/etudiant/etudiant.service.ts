import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Etudiant } from './etudiant.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EtudiantService {

    private resourceUrl =  SERVER_API_URL + 'api/etudiants';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(etudiant: Etudiant): Observable<Etudiant> {
        const copy = this.convert(etudiant);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(etudiant: Etudiant): Observable<Etudiant> {
        const copy = this.convert(etudiant);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Etudiant> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Etudiant.
     */
    private convertItemFromServer(json: any): Etudiant {
        const entity: Etudiant = Object.assign(new Etudiant(), json);
        entity.dn = this.dateUtils
            .convertLocalDateFromServer(json.dn);
        return entity;
    }

    /**
     * Convert a Etudiant to a JSON which can be sent to the server.
     */
    private convert(etudiant: Etudiant): Etudiant {
        const copy: Etudiant = Object.assign({}, etudiant);
        copy.dn = this.dateUtils
            .convertLocalDateToServer(etudiant.dn);
        return copy;
    }
}
