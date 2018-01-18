import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Etudiant } from './etudiant.model';
import { EtudiantService } from './etudiant.service';

@Injectable()
export class EtudiantPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private etudiantService: EtudiantService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.etudiantService.find(id).subscribe((etudiant) => {
                    if (etudiant.dn) {
                        etudiant.dn = {
                            year: etudiant.dn.getFullYear(),
                            month: etudiant.dn.getMonth() + 1,
                            day: etudiant.dn.getDate()
                        };
                    }
                    this.ngbModalRef = this.etudiantModalRef(component, etudiant);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.etudiantModalRef(component, new Etudiant());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    etudiantModalRef(component: Component, etudiant: Etudiant): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.etudiant = etudiant;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
