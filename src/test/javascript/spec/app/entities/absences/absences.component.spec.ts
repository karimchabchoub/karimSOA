/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SoaTestModule } from '../../../test.module';
import { AbsencesComponent } from '../../../../../../main/webapp/app/entities/absences/absences.component';
import { AbsencesService } from '../../../../../../main/webapp/app/entities/absences/absences.service';
import { Absences } from '../../../../../../main/webapp/app/entities/absences/absences.model';

describe('Component Tests', () => {

    describe('Absences Management Component', () => {
        let comp: AbsencesComponent;
        let fixture: ComponentFixture<AbsencesComponent>;
        let service: AbsencesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoaTestModule],
                declarations: [AbsencesComponent],
                providers: [
                    AbsencesService
                ]
            })
            .overrideTemplate(AbsencesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AbsencesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AbsencesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Absences(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.absences[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
