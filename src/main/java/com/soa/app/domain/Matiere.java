package com.soa.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Matiere.
 */
@Entity
@Table(name = "matiere")
public class Matiere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "coeff")
    private Integer coeff;

    @ManyToOne
    private Enseignant enseignant;

    @ManyToOne
    private Section section;

    @OneToMany(mappedBy = "matiere")
    @JsonIgnore
    private Set<Note> associers = new HashSet<>();

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

    public Matiere name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCoeff() {
        return coeff;
    }

    public Matiere coeff(Integer coeff) {
        this.coeff = coeff;
        return this;
    }

    public void setCoeff(Integer coeff) {
        this.coeff = coeff;
    }

    public Enseignant getEnseignant() {
        return enseignant;
    }

    public Matiere enseignant(Enseignant enseignant) {
        this.enseignant = enseignant;
        return this;
    }

    public void setEnseignant(Enseignant enseignant) {
        this.enseignant = enseignant;
    }

    public Section getSection() {
        return section;
    }

    public Matiere section(Section section) {
        this.section = section;
        return this;
    }

    public void setSection(Section section) {
        this.section = section;
    }

    public Set<Note> getAssociers() {
        return associers;
    }

    public Matiere associers(Set<Note> notes) {
        this.associers = notes;
        return this;
    }

    public Matiere addAssocier(Note note) {
        this.associers.add(note);
        note.setMatiere(this);
        return this;
    }

    public Matiere removeAssocier(Note note) {
        this.associers.remove(note);
        note.setMatiere(null);
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
        Matiere matiere = (Matiere) o;
        if (matiere.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), matiere.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Matiere{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", coeff=" + getCoeff() +
            "}";
    }
}
