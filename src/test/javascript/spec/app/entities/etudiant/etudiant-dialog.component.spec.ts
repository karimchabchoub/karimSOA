/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SoaTestModule } from '../../../test.module';
import { EtudiantDialogComponent } from '../../../../../../main/webapp/app/entities/etudiant/etudiant-dialog.component';
import { EtudiantService } from '../../../../../../main/webapp/app/entities/etudiant/etudiant.service';
import { Etudiant } from '../../../../../../main/webapp/app/entities/etudiant/etudiant.model';
import { SectionService } from '../../../../../../main/webapp/app/entities/section';

describe('Component Tests', () => {

    describe('Etudiant Management Dialog Component', () => {
        let comp: EtudiantDialogComponent;
        let fixture: ComponentFixture<EtudiantDialogComponent>;
        let service: EtudiantService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoaTestModule],
                declarations: [EtudiantDialogComponent],
                providers: [
                    SectionService,
                    EtudiantService
                ]
            })
            .overrideTemplate(EtudiantDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtudiantDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtudiantService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Etudiant(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.etudiant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'etudiantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Etudiant();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.etudiant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'etudiantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
