import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DemandeAttestationComponent } from './demande-attestation.component';
import { DemandeAttestationDetailComponent } from './demande-attestation-detail.component';
import { DemandeAttestationPopupComponent } from './demande-attestation-dialog.component';
import { DemandeAttestationDeletePopupComponent } from './demande-attestation-delete-dialog.component';

export const demandeAttestationRoute: Routes = [
    {
        path: 'demande-attestation',
        component: DemandeAttestationComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ETUDIANT', 'ROLE_ENSEIGNANT' ],
            pageTitle: 'DemandeAttestations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'demande-attestation/:id',
        component: DemandeAttestationDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ETUDIANT', 'ROLE_ENSEIGNANT'],
            pageTitle: 'DemandeAttestations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const demandeAttestationPopupRoute: Routes = [
    {
        path: 'demande-attestation-new',
        component: DemandeAttestationPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ETUDIANT', 'ROLE_ENSEIGNANT'],
            pageTitle: 'DemandeAttestations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'demande-attestation/:id/edit',
        component: DemandeAttestationPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ETUDIANT', 'ROLE_ENSEIGNANT'],
            pageTitle: 'DemandeAttestations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'demande-attestation/:id/delete',
        component: DemandeAttestationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ETUDIANT', 'ROLE_ENSEIGNANT'],
            pageTitle: 'DemandeAttestations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
