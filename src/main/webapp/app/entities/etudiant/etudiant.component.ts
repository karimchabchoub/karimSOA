import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Etudiant } from './etudiant.model';
import { EtudiantService } from './etudiant.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-etudiant',
    templateUrl: './etudiant.component.html'
})
export class EtudiantComponent implements OnInit, OnDestroy {
etudiants: Etudiant[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private etudiantService: EtudiantService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.etudiantService.query().subscribe(
            (res: ResponseWrapper) => {
                this.etudiants = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEtudiants();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Etudiant) {
        return item.id;
    }
    registerChangeInEtudiants() {
        this.eventSubscriber = this.eventManager.subscribe('etudiantListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
