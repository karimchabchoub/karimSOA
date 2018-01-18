/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SoaTestModule } from '../../../test.module';
import { EnseignantDetailComponent } from '../../../../../../main/webapp/app/entities/enseignant/enseignant-detail.component';
import { EnseignantService } from '../../../../../../main/webapp/app/entities/enseignant/enseignant.service';
import { Enseignant } from '../../../../../../main/webapp/app/entities/enseignant/enseignant.model';

describe('Component Tests', () => {

    describe('Enseignant Management Detail Component', () => {
        let comp: EnseignantDetailComponent;
        let fixture: ComponentFixture<EnseignantDetailComponent>;
        let service: EnseignantService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SoaTestModule],
                declarations: [EnseignantDetailComponent],
                providers: [
                    EnseignantService
                ]
            })
            .overrideTemplate(EnseignantDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnseignantDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnseignantService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Enseignant(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.enseignant).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
