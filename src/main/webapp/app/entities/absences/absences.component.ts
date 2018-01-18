import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Absences } from './absences.model';
import { AbsencesService } from './absences.service';
import { Principal, ResponseWrapper } from '../../shared';

declare var $:any;
@Component({
    selector: 'jhi-absences',
    templateUrl: './absences.component.html'
})
export class AbsencesComponent implements OnInit, OnDestroy {
absences: Absences[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private absencesService: AbsencesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.absencesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.absences = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAbsences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Absences) {
        return item.id;
    }
    registerChangeInAbsences() {
        this.eventSubscriber = this.eventManager.subscribe('absencesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }



}
