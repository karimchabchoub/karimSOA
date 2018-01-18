/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SoaTestModule } from '../../../test.module';
import { EnseignantComponent } from '../../../../../../main/webapp/app/entities/enseignant/enseignant.component';
import { EnseignantService } from '../../../../../../main/webapp/app/entities/enseignant/enseignant.service';
import { Enseignant } from '../../../../../../main/webapp/app/entities/enseignant/enseignant.model';

describe('Component Tests', () => {

    describe('Enseignant Management Component', () => {
        let comp: EnseignantComponent;
        let fixture: ComponentFixture<EnseignantComponent>;
        let service: EnseignantService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoaTestModule],
                declarations: [EnseignantComponent],
                providers: [
                    EnseignantService
                ]
            })
            .overrideTemplate(EnseignantComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnseignantComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnseignantService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Enseignant(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.enseignants[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
