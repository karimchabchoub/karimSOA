/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SoaTestModule } from '../../../test.module';
import { AbsencesDetailComponent } from '../../../../../../main/webapp/app/entities/absences/absences-detail.component';
import { AbsencesService } from '../../../../../../main/webapp/app/entities/absences/absences.service';
import { Absences } from '../../../../../../main/webapp/app/entities/absences/absences.model';

describe('Component Tests', () => {

    describe('Absences Management Detail Component', () => {
        let comp: AbsencesDetailComponent;
        let fixture: ComponentFixture<AbsencesDetailComponent>;
        let service: AbsencesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoaTestModule],
                declarations: [AbsencesDetailComponent],
                providers: [
                    AbsencesService
                ]
            })
            .overrideTemplate(AbsencesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AbsencesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AbsencesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Absences(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.absences).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
