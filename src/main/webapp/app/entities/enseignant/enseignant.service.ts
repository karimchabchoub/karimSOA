import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Enseignant } from './enseignant.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EnseignantService {

    private resourceUrl =  SERVER_API_URL + 'api/enseignants';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(enseignant: Enseignant): Observable<Enseignant> {
        const copy = this.convert(enseignant);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(enseignant: Enseignant): Observable<Enseignant> {
        const copy = this.convert(enseignant);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Enseignant> {
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
     * Convert a returned JSON object to Enseignant.
     */
    private convertItemFromServer(json: any): Enseignant {
        const entity: Enseignant = Object.assign(new Enseignant(), json);
        entity.dn = this.dateUtils
            .convertLocalDateFromServer(json.dn);
        return entity;
    }

    /**
     * Convert a Enseignant to a JSON which can be sent to the server.
     */
    private convert(enseignant: Enseignant): Enseignant {
        const copy: Enseignant = Object.assign({}, enseignant);
        copy.dn = this.dateUtils
            .convertLocalDateToServer(enseignant.dn);
        return copy;
    }
}
