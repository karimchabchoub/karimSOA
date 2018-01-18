import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Enseignant } from './enseignant.model';
import { EnseignantPopupService } from './enseignant-popup.service';
import { EnseignantService } from './enseignant.service';

@Component({
    selector: 'jhi-enseignant-dialog',
    templateUrl: './enseignant-dialog.component.html'
})
export class EnseignantDialogComponent implements OnInit {

    enseignant: Enseignant;
    isSaving: boolean;
    dnDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private enseignantService: EnseignantService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.enseignant.id !== undefined) {
            this.subscribeToSaveResponse(
                this.enseignantService.update(this.enseignant));
        } else {
            this.subscribeToSaveResponse(
                this.enseignantService.create(this.enseignant));
        }
    }

    private subscribeToSaveResponse(result: Observable<Enseignant>) {
        result.subscribe((res: Enseignant) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Enseignant) {
        this.eventManager.broadcast({ name: 'enseignantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-enseignant-popup',
    template: ''
})
export class EnseignantPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enseignantPopupService: EnseignantPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.enseignantPopupService
                    .open(EnseignantDialogComponent as Component, params['id']);
            } else {
                this.enseignantPopupService
                    .open(EnseignantDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
