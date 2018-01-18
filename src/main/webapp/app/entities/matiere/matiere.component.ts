import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Matiere } from './matiere.model';
import { MatiereService } from './matiere.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-matiere',
    templateUrl: './matiere.component.html'
})
export class MatiereComponent implements OnInit, OnDestroy {
matieres: Matiere[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private matiereService: MatiereService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.matiereService.query().subscribe(
            (res: ResponseWrapper) => {
                this.matieres = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMatieres();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Matiere) {
        return item.id;
    }
    registerChangeInMatieres() {
        this.eventSubscriber = this.eventManager.subscribe('matiereListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
