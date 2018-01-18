import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AbsencesComponent } from './absences.component';
import { AbsencesDetailComponent } from './absences-detail.component';
import { AbsencesPopupComponent } from './absences-dialog.component';
import { AbsencesDeletePopupComponent } from './absences-delete-dialog.component';

export const absencesRoute: Routes = [
    {
        path: 'absences',
        component: AbsencesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Absences'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'absences/:id',
        component: AbsencesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Absences'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const absencesPopupRoute: Routes = [
    {
        path: 'absences-new',
        component: AbsencesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Absences'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'absences/:id/edit',
        component: AbsencesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Absences'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'absences/:id/delete',
        component: AbsencesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Absences'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
