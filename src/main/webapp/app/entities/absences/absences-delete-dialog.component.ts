import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Absences } from './absences.model';
import { AbsencesPopupService } from './absences-popup.service';
import { AbsencesService } from './absences.service';

@Component({
    selector: 'jhi-absences-delete-dialog',
    templateUrl: './absences-delete-dialog.component.html'
})
export class AbsencesDeleteDialogComponent {

    absences: Absences;

    constructor(
        private absencesService: AbsencesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.absencesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'absencesListModification',
                content: 'Deleted an absences'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-absences-delete-popup',
    template: ''
})
export class AbsencesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private absencesPopupService: AbsencesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.absencesPopupService
                .open(AbsencesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
