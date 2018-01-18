package com.soa.app.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DemandeAttestation.
 */
@Entity
@Table(name = "demande_attestation")
public class DemandeAttestation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "cause")
    private String cause;

    @OneToOne
    @JoinColumn(unique = true)
    private Enseignant signerPar;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public DemandeAttestation name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public DemandeAttestation lastname(String lastname) {
        this.lastname = lastname;
        return this;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getCause() {
        return cause;
    }

    public DemandeAttestation cause(String cause) {
        this.cause = cause;
        return this;
    }

    public void setCause(String cause) {
        this.cause = cause;
    }

    public Enseignant getSignerPar() {
        return signerPar;
    }

    public DemandeAttestation signerPar(Enseignant enseignant) {
        this.signerPar = enseignant;
        return this;
    }

    public void setSignerPar(Enseignant enseignant) {
        this.signerPar = enseignant;
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
        DemandeAttestation demandeAttestation = (DemandeAttestation) o;
        if (demandeAttestation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), demandeAttestation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DemandeAttestation{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", lastname='" + getLastname() + "'" +
            ", cause='" + getCause() + "'" +
            "}";
    }
}
