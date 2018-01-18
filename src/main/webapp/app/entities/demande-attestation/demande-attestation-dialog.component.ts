import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DemandeAttestation } from './demande-attestation.model';
import { DemandeAttestationPopupService } from './demande-attestation-popup.service';
import { DemandeAttestationService } from './demande-attestation.service';
import { Enseignant, EnseignantService } from '../enseignant';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-demande-attestation-dialog',
    templateUrl: './demande-attestation-dialog.component.html'
})
export class DemandeAttestationDialogComponent implements OnInit {

    demandeAttestation: DemandeAttestation;
    isSaving: boolean;

    signerpars: Enseignant[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private demandeAttestationService: DemandeAttestationService,
        private enseignantService: EnseignantService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.enseignantService
            .query({filter: 'demandeattestation-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.demandeAttestation.signerPar || !this.demandeAttestation.signerPar.id) {
                    this.signerpars = res.json;
                } else {
                    this.enseignantService
                        .find(this.demandeAttestation.signerPar.id)
                        .subscribe((subRes: Enseignant) => {
                            this.signerpars = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.demandeAttestation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.demandeAttestationService.update(this.demandeAttestation));
        } else {
            this.subscribeToSaveResponse(
                this.demandeAttestationService.create(this.demandeAttestation));
        }
    }

    private subscribeToSaveResponse(result: Observable<DemandeAttestation>) {
        result.subscribe((res: DemandeAttestation) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DemandeAttestation) {
        this.eventManager.broadcast({ name: 'demandeAttestationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEnseignantById(index: number, item: Enseignant) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-demande-attestation-popup',
    template: ''
})
export class DemandeAttestationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private demandeAttestationPopupService: DemandeAttestationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.demandeAttestationPopupService
                    .open(DemandeAttestationDialogComponent as Component, params['id']);
            } else {
                this.demandeAttestationPopupService
                    .open(DemandeAttestationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
