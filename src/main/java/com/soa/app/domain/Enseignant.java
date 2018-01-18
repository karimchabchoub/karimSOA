package com.soa.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Enseignant.
 */
@Entity
@Table(name = "enseignant")
public class Enseignant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cin")
    private Long cin;

    @Column(name = "name")
    private String name;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "email")
    private String email;

    @Column(name = "dn")
    private LocalDate dn;

    @Column(name = "sexe")
    private String sexe;

    @OneToMany(mappedBy = "enseignant")
    @JsonIgnore
    private Set<Matiere> enseigners = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCin() {
        return cin;
    }

    public Enseignant cin(Long cin) {
        this.cin = cin;
        return this;
    }

    public void setCin(Long cin) {
        this.cin = cin;
    }

    public String getName() {
        return name;
    }

    public Enseignant name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public Enseignant lastname(String lastname) {
        this.lastname = lastname;
        return this;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public Enseignant email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDn() {
        return dn;
    }

    public Enseignant dn(LocalDate dn) {
        this.dn = dn;
        return this;
    }

    public void setDn(LocalDate dn) {
        this.dn = dn;
    }

    public String getSexe() {
        return sexe;
    }

    public Enseignant sexe(String sexe) {
        this.sexe = sexe;
        return this;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public Set<Matiere> getEnseigners() {
        return enseigners;
    }

    public Enseignant enseigners(Set<Matiere> matieres) {
        this.enseigners = matieres;
        return this;
    }

    public Enseignant addEnseigner(Matiere matiere) {
        this.enseigners.add(matiere);
        matiere.setEnseignant(this);
        return this;
    }

    public Enseignant removeEnseigner(Matiere matiere) {
        this.enseigners.remove(matiere);
        matiere.setEnseignant(null);
        return this;
    }

    public void setEnseigners(Set<Matiere> matieres) {
        this.enseigners = matieres;
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
        Enseignant enseignant = (Enseignant) o;
        if (enseignant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), enseignant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Enseignant{" +
            "id=" + getId() +
            ", cin=" + getCin() +
            ", name='" + getName() + "'" +
            ", lastname='" + getLastname() + "'" +
            ", email='" + getEmail() + "'" +
            ", dn='" + getDn() + "'" +
            ", sexe='" + getSexe() + "'" +
            "}";
    }
}
