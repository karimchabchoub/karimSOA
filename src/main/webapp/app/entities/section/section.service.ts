import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Section } from './section.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SectionService {

    private resourceUrl =  SERVER_API_URL + 'api/sections';

    constructor(private http: Http) { }

    create(section: Section): Observable<Section> {
        const copy = this.convert(section);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(section: Section): Observable<Section> {
        const copy = this.convert(section);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Section> {
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
     * Convert a returned JSON object to Section.
     */
    private convertItemFromServer(json: any): Section {
        const entity: Section = Object.assign(new Section(), json);
        return entity;
    }

    /**
     * Convert a Section to a JSON which can be sent to the server.
     */
    private convert(section: Section): Section {
        const copy: Section = Object.assign({}, section);
        return copy;
    }
}
