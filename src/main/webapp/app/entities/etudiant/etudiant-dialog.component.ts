import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Etudiant } from './etudiant.model';
import { EtudiantPopupService } from './etudiant-popup.service';
import { EtudiantService } from './etudiant.service';
import { Section, SectionService } from '../section';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-etudiant-dialog',
    templateUrl: './etudiant-dialog.component.html'
})
export class EtudiantDialogComponent implements OnInit {

    etudiant: Etudiant;
    isSaving: boolean;

    etudiers: Section[];
    dnDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private etudiantService: EtudiantService,
        private sectionService: SectionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.sectionService
            .query({filter: 'etudiant-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.etudiant.etudier || !this.etudiant.etudier.id) {
                    this.etudiers = res.json;
                } else {
                    this.sectionService
                        .find(this.etudiant.etudier.id)
                        .subscribe((subRes: Section) => {
                            this.etudiers = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.etudiant.id !== undefined) {
            this.subscribeToSaveResponse(
                this.etudiantService.update(this.etudiant));
        } else {
            this.subscribeToSaveResponse(
                this.etudiantService.create(this.etudiant));
        }
    }

    private subscribeToSaveResponse(result: Observable<Etudiant>) {
        result.subscribe((res: Etudiant) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Etudiant) {
        this.eventManager.broadcast({ name: 'etudiantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSectionById(index: number, item: Section) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-etudiant-popup',
    template: ''
})
export class EtudiantPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private etudiantPopupService: EtudiantPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.etudiantPopupService
                    .open(EtudiantDialogComponent as Component, params['id']);
            } else {
                this.etudiantPopupService
                    .open(EtudiantDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
