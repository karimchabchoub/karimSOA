import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DemandeAttestation } from './demande-attestation.model';
import { DemandeAttestationService } from './demande-attestation.service';

@Component({
    selector: 'jhi-demande-attestation-detail',
    templateUrl: './demande-attestation-detail.component.html'
})
export class DemandeAttestationDetailComponent implements OnInit, OnDestroy {

    demandeAttestation: DemandeAttestation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private demandeAttestationService: DemandeAttestationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDemandeAttestations();
    }

    load(id) {
        this.demandeAttestationService.find(id).subscribe((demandeAttestation) => {
            this.demandeAttestation = demandeAttestation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDemandeAttestations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'demandeAttestationListModification',
            (response) => this.load(this.demandeAttestation.id)
        );
    }
}
