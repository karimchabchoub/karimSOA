import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Note } from './note.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class NoteService {

    private resourceUrl =  SERVER_API_URL + 'api/notes';

    constructor(private http: Http) { }

    create(note: Note): Observable<Note> {
        const copy = this.convert(note);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(note: Note): Observable<Note> {
        const copy = this.convert(note);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Note> {
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
     * Convert a returned JSON object to Note.
     */
    private convertItemFromServer(json: any): Note {
        const entity: Note = Object.assign(new Note(), json);
        return entity;
    }

    /**
     * Convert a Note to a JSON which can be sent to the server.
     */
    private convert(note: Note): Note {
        const copy: Note = Object.assign({}, note);
        return copy;
    }
}
