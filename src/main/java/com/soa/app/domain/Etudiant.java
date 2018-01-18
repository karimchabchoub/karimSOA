package com.soa.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Etudiant.
 */
@Entity
@Table(name = "etudiant")
public class Etudiant implements Serializable {

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

    @Column(name = "moyenne")
    private String moyenne;

    @OneToOne
    @JoinColumn(unique = true)
    private Section etudier;

    @OneToMany(mappedBy = "etudiant")
    @JsonIgnore
    private Set<Note> associers = new HashSet<>();

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

    public Etudiant cin(Long cin) {
        this.cin = cin;
        return this;
    }

    public void setCin(Long cin) {
        this.cin = cin;
    }

    public String getName() {
        return name;
    }

    public Etudiant name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public Etudiant lastname(String lastname) {
        this.lastname = lastname;
        return this;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public Etudiant email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDn() {
        return dn;
    }

    public Etudiant dn(LocalDate dn) {
        this.dn = dn;
        return this;
    }

    public void setDn(LocalDate dn) {
        this.dn = dn;
    }

    public String getSexe() {
        return sexe;
    }

    public Etudiant sexe(String sexe) {
        this.sexe = sexe;
        return this;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public String getMoyenne() {
        return moyenne;
    }

    public Etudiant moyenne(String moyenne) {
        this.moyenne = moyenne;
        return this;
    }

    public void setMoyenne(String moyenne) {
        this.moyenne = moyenne;
    }

    public Section getEtudier() {
        return etudier;
    }

    public Etudiant etudier(Section section) {
        this.etudier = section;
        return this;
    }

    public void setEtudier(Section section) {
        this.etudier = section;
    }

    public Set<Note> getAssociers() {
        return associers;
    }

    public Etudiant associers(Set<Note> notes) {
        this.associers = notes;
        return this;
    }

    public Etudiant addAssocier(Note note) {
        this.associers.add(note);
        note.setEtudiant(this);
        return this;
    }

    public Etudiant removeAssocier(Note note) {
        this.associers.remove(note);
        note.setEtudiant(null);
        return this;
    }

    public void setAssociers(Set<Note> notes) {
        this.associers = notes;
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
        Etudiant etudiant = (Etudiant) o;
        if (etudiant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), etudiant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Etudiant{" +
            "id=" + getId() +
            ", cin=" + getCin() +
            ", name='" + getName() + "'" +
            ", lastname='" + getLastname() + "'" +
            ", email='" + getEmail() + "'" +
            ", dn='" + getDn() + "'" +
            ", sexe='" + getSexe() + "'" +
            ", moyenne='" + getMoyenne() + "'" +
            "}";
    }
}
