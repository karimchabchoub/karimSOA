import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Absences } from './absences.model';
import { AbsencesService } from './absences.service';

@Component({
    selector: 'jhi-absences-detail',
    templateUrl: './absences-detail.component.html'
})
export class AbsencesDetailComponent implements OnInit, OnDestroy {

    absences: Absences;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private absencesService: AbsencesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAbsences();
    }

    load(id) {
        this.absencesService.find(id).subscribe((absences) => {
            this.absences = absences;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAbsences() {
        this.eventSubscriber = this.eventManager.subscribe(
            'absencesListModification',
            (response) => this.load(this.absences.id)
        );
    }
}
