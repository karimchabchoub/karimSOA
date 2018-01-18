import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DemandeAttestation } from './demande-attestation.model';
import { DemandeAttestationService } from './demande-attestation.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-demande-attestation',
    templateUrl: './demande-attestation.component.html'
})
export class DemandeAttestationComponent implements OnInit, OnDestroy {
demandeAttestations: DemandeAttestation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private demandeAttestationService: DemandeAttestationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.demandeAttestationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.demandeAttestations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDemandeAttestations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DemandeAttestation) {
        return item.id;
    }
    registerChangeInDemandeAttestations() {
        this.eventSubscriber = this.eventManager.subscribe('demandeAttestationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
