import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DemandeAttestation } from './demande-attestation.model';
import { DemandeAttestationPopupService } from './demande-attestation-popup.service';
import { DemandeAttestationService } from './demande-attestation.service';

@Component({
    selector: 'jhi-demande-attestation-delete-dialog',
    templateUrl: './demande-attestation-delete-dialog.component.html'
})
export class DemandeAttestationDeleteDialogComponent {

    demandeAttestation: DemandeAttestation;

    constructor(
        private demandeAttestationService: DemandeAttestationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.demandeAttestationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'demandeAttestationListModification',
                content: 'Deleted an demandeAttestation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-demande-attestation-delete-popup',
    template: ''
})
export class DemandeAttestationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private demandeAttestationPopupService: DemandeAttestationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.demandeAttestationPopupService
                .open(DemandeAttestationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
