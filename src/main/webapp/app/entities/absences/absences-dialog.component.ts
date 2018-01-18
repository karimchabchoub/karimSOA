import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Absences } from './absences.model';
import { AbsencesPopupService } from './absences-popup.service';
import { AbsencesService } from './absences.service';
import { Etudiant, EtudiantService } from '../etudiant';
import { Matiere, MatiereService } from '../matiere';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-absences-dialog',
    templateUrl: './absences-dialog.component.html'
})
export class AbsencesDialogComponent implements OnInit {

    absences: Absences;
    isSaving: boolean;

    etudiants: Etudiant[];

    matieres: Matiere[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private absencesService: AbsencesService,
        private etudiantService: EtudiantService,
        private matiereService: MatiereService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.etudiantService.query()
            .subscribe((res: ResponseWrapper) => { this.etudiants = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.matiereService.query()
            .subscribe((res: ResponseWrapper) => { this.matieres = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.absences.id !== undefined) {
            this.subscribeToSaveResponse(
                this.absencesService.update(this.absences));
        } else {
            this.subscribeToSaveResponse(
                this.absencesService.create(this.absences));
        }
    }

    private subscribeToSaveResponse(result: Observable<Absences>) {
        result.subscribe((res: Absences) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Absences) {
        this.eventManager.broadcast({ name: 'absencesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEtudiantById(index: number, item: Etudiant) {
        return item.id;
    }

    trackMatiereById(index: number, item: Matiere) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-absences-popup',
    template: ''
})
export class AbsencesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private absencesPopupService: AbsencesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.absencesPopupService
                    .open(AbsencesDialogComponent as Component, params['id']);
            } else {
                this.absencesPopupService
                    .open(AbsencesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
