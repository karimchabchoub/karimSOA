package com.soa.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Section.
 */
@Entity
@Table(name = "section")
public class Section implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "section")
    @JsonIgnore
    private Set<Matiere> contients = new HashSet<>();

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

    public Section name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Matiere> getContients() {
        return contients;
    }

    public Section contients(Set<Matiere> matieres) {
        this.contients = matieres;
        return this;
    }

    public Section addContient(Matiere matiere) {
        this.contients.add(matiere);
        matiere.setSection(this);
        return this;
    }

    public Section removeContient(Matiere matiere) {
        this.contients.remove(matiere);
        matiere.setSection(null);
        return this;
    }

    public void setContients(Set<Matiere> matieres) {
        this.contients = matieres;
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
        Section section = (Section) o;
        if (section.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), section.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Section{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
