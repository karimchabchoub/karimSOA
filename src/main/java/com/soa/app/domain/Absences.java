package com.soa.app.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Absences.
 */
@Entity
@Table(name = "absences")
public class Absences implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nb_absences")
    private Float nbAbsences;

    @ManyToOne
    private Etudiant possede;

    @ManyToOne
    private Matiere associer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getNbAbsences() {
        return nbAbsences;
    }

    public Absences nbAbsences(Float nbAbsences) {
        this.nbAbsences = nbAbsences;
        return this;
    }

    public void setNbAbsences(Float nbAbsences) {
        this.nbAbsences = nbAbsences;
    }

    public Etudiant getPossede() {
        return possede;
    }

    public Absences possede(Etudiant etudiant) {
        this.possede = etudiant;
        return this;
    }

    public void setPossede(Etudiant etudiant) {
        this.possede = etudiant;
    }

    public Matiere getAssocier() {
        return associer;
    }

    public Absences associer(Matiere matiere) {
        this.associer = matiere;
        return this;
    }

    public void setAssocier(Matiere matiere) {
        this.associer = matiere;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Absences absences = (Absences) o;
        if (absences.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), absences.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Absences{" +
            "id=" + getId() +
            ", nbAbsences=" + getNbAbsences() +
            "}";
    }
}
