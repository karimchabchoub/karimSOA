import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Section } from './section.model';
import { SectionService } from './section.service';

@Component({
    selector: 'jhi-section-detail',
    templateUrl: './section-detail.component.html'
})
export class SectionDetailComponent implements OnInit, OnDestroy {

    section: Section;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sectionService: SectionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSections();
    }

    load(id) {
        this.sectionService.find(id).subscribe((section) => {
            this.section = section;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSections() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sectionListModification',
            (response) => this.load(this.section.id)
        );
    }
}
