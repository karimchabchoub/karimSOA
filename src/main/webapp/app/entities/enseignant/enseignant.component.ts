import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Enseignant } from './enseignant.model';
import { EnseignantService } from './enseignant.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-enseignant',
    templateUrl: './enseignant.component.html'
})
export class EnseignantComponent implements OnInit, OnDestroy {
enseignants: Enseignant[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private enseignantService: EnseignantService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.enseignantService.query().subscribe(
            (res: ResponseWrapper) => {
                this.enseignants = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEnseignants();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Enseignant) {
        return item.id;
    }
    registerChangeInEnseignants() {
        this.eventSubscriber = this.eventManager.subscribe('enseignantListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
