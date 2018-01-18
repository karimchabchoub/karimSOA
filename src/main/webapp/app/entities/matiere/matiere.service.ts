import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Matiere } from './matiere.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MatiereService {

    private resourceUrl =  SERVER_API_URL + 'api/matieres';

    constructor(private http: Http) { }

    create(matiere: Matiere): Observable<Matiere> {
        const copy = this.convert(matiere);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(matiere: Matiere): Observable<Matiere> {
        const copy = this.convert(matiere);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Matiere> {
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
     * Convert a returned JSON object to Matiere.
     */
    private convertItemFromServer(json: any): Matiere {
        const entity: Matiere = Object.assign(new Matiere(), json);
        return entity;
    }

    /**
     * Convert a Matiere to a JSON which can be sent to the server.
     */
    private convert(matiere: Matiere): Matiere {
        const copy: Matiere = Object.assign({}, matiere);
        return copy;
    }
}
