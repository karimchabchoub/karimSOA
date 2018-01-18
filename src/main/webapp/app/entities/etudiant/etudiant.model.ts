import { BaseEntity } from './../../shared';

export class Etudiant implements BaseEntity {
    constructor(
        public id?: number,
        public cin?: number,
        public name?: string,
        public lastname?: string,
        public email?: string,
        public dn?: any,
        public sexe?: string,
        public moyenne?: string,
        public etudier?: BaseEntity,
        public associers?: BaseEntity[],
    ) {
    }
}
