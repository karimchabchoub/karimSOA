import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DemandeAttestation } from './demande-attestation.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DemandeAttestationService {

    private resourceUrl =  SERVER_API_URL + 'api/demande-attestations';

    constructor(private http: Http) { }

    create(demandeAttestation: DemandeAttestation): Observable<DemandeAttestation> {
        const copy = this.convert(demandeAttestation);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(demandeAttestation: DemandeAttestation): Observable<DemandeAttestation> {
        const copy = this.convert(demandeAttestation);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DemandeAttestation> {
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
     * Convert a returned JSON object to DemandeAttestation.
     */
    private convertItemFromServer(json: any): DemandeAttestation {
        const entity: DemandeAttestation = Object.assign(new DemandeAttestation(), json);
        return entity;
    }

    /**
     * Convert a DemandeAttestation to a JSON which can be sent to the server.
     */
    private convert(demandeAttestation: DemandeAttestation): DemandeAttestation {
        const copy: DemandeAttestation = Object.assign({}, demandeAttestation);
        return copy;
    }
}
