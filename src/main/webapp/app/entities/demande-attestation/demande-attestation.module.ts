import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoaSharedModule } from '../../shared';
import {
    DemandeAttestationService,
    DemandeAttestationPopupService,
    DemandeAttestationComponent,
    DemandeAttestationDetailComponent,
    DemandeAttestationDialogComponent,
    DemandeAttestationPopupComponent,
    DemandeAttestationDeletePopupComponent,
    DemandeAttestationDeleteDialogComponent,
    demandeAttestationRoute,
    demandeAttestationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...demandeAttestationRoute,
    ...demandeAttestationPopupRoute,
];

@NgModule({
    imports: [
        SoaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DemandeAttestationComponent,
        DemandeAttestationDetailComponent,
        DemandeAttestationDialogComponent,
        DemandeAttestationDeleteDialogComponent,
        DemandeAttestationPopupComponent,
        DemandeAttestationDeletePopupComponent,
    ],
    entryComponents: [
        DemandeAttestationComponent,
        DemandeAttestationDialogComponent,
        DemandeAttestationPopupComponent,
        DemandeAttestationDeleteDialogComponent,
        DemandeAttestationDeletePopupComponent,
    ],
    providers: [
        DemandeAttestationService,
        DemandeAttestationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoaDemandeAttestationModule {}
