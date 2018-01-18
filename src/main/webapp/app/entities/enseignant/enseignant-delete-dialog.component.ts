import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Enseignant } from './enseignant.model';
import { EnseignantPopupService } from './enseignant-popup.service';
import { EnseignantService } from './enseignant.service';

@Component({
    selector: 'jhi-enseignant-delete-dialog',
    templateUrl: './enseignant-delete-dialog.component.html'
})
export class EnseignantDeleteDialogComponent {

    enseignant: Enseignant;

    constructor(
        private enseignantService: EnseignantService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.enseignantService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'enseignantListModification',
                content: 'Deleted an enseignant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-enseignant-delete-popup',
    template: ''
})
export class EnseignantDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enseignantPopupService: EnseignantPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.enseignantPopupService
                .open(EnseignantDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
