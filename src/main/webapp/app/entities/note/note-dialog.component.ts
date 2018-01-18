import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Note } from './note.model';
import { NotePopupService } from './note-popup.service';
import { NoteService } from './note.service';
import { Etudiant, EtudiantService } from '../etudiant';
import { Matiere, MatiereService } from '../matiere';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-note-dialog',
    templateUrl: './note-dialog.component.html'
})
export class NoteDialogComponent implements OnInit {

    note: Note;
    isSaving: boolean;

    etudiants: Etudiant[];

    matieres: Matiere[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private noteService: NoteService,
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
        if (this.note.id !== undefined) {
            this.subscribeToSaveResponse(
                this.noteService.update(this.note));
        } else {
            this.subscribeToSaveResponse(
                this.noteService.create(this.note));
        }
    }

    private subscribeToSaveResponse(result: Observable<Note>) {
        result.subscribe((res: Note) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Note) {
        this.eventManager.broadcast({ name: 'noteListModification', content: 'OK'});
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
    selector: 'jhi-note-popup',
    template: ''
})
export class NotePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notePopupService: NotePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.notePopupService
                    .open(NoteDialogComponent as Component, params['id']);
            } else {
                this.notePopupService
                    .open(NoteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
