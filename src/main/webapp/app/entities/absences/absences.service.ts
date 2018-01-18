import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Absences } from './absences.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AbsencesService {

    private resourceUrl =  SERVER_API_URL + 'api/absences';

    constructor(private http: Http) { }

    create(absences: Absences): Observable<Absences> {
        const copy = this.convert(absences);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(absences: Absences): Observable<Absences> {
        const copy = this.convert(absences);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Absences> {
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
     * Convert a returned JSON object to Absences.
     */
    private convertItemFromServer(json: any): Absences {
        const entity: Absences = Object.assign(new Absences(), json);
        return entity;
    }

    /**
     * Convert a Absences to a JSON which can be sent to the server.
     */
    private convert(absences: Absences): Absences {
        const copy: Absences = Object.assign({}, absences);
        return copy;
    }
}
