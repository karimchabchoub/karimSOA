package com.soa.app.web.rest;

import com.soa.app.SoaApp;

import com.soa.app.domain.DemandeAttestation;
import com.soa.app.repository.DemandeAttestationRepository;
import com.soa.app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.soa.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DemandeAttestationResource REST controller.
 *
 * @see DemandeAttestationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoaApp.class)
public class DemandeAttestationResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LASTNAME = "AAAAAAAAAA";
    private static final String UPDATED_LASTNAME = "BBBBBBBBBB";

    private static final String DEFAULT_CAUSE = "AAAAAAAAAA";
    private static final String UPDATED_CAUSE = "BBBBBBBBBB";

    @Autowired
    private DemandeAttestationRepository demandeAttestationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDemandeAttestationMockMvc;

    private DemandeAttestation demandeAttestation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DemandeAttestationResource demandeAttestationResource = new DemandeAttestationResource(demandeAttestationRepository);
        this.restDemandeAttestationMockMvc = MockMvcBuilders.standaloneSetup(demandeAttestationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DemandeAttestation createEntity(EntityManager em) {
        DemandeAttestation demandeAttestation = new DemandeAttestation()
            .name(DEFAULT_NAME)
            .lastname(DEFAULT_LASTNAME)
            .cause(DEFAULT_CAUSE);
        return demandeAttestation;
    }

    @Before
    public void initTest() {
        demandeAttestation = createEntity(em);
    }

    @Test
    @Transactional
    public void createDemandeAttestation() throws Exception {
        int databaseSizeBeforeCreate = demandeAttestationRepository.findAll().size();

        // Create the DemandeAttestation
        restDemandeAttestationMockMvc.perform(post("/api/demande-attestations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demandeAttestation)))
            .andExpect(status().isCreated());

        // Validate the DemandeAttestation in the database
        List<DemandeAttestation> demandeAttestationList = demandeAttestationRepository.findAll();
        assertThat(demandeAttestationList).hasSize(databaseSizeBeforeCreate + 1);
        DemandeAttestation testDemandeAttestation = demandeAttestationList.get(demandeAttestationList.size() - 1);
        assertThat(testDemandeAttestation.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDemandeAttestation.getLastname()).isEqualTo(DEFAULT_LASTNAME);
        assertThat(testDemandeAttestation.getCause()).isEqualTo(DEFAULT_CAUSE);
    }

    @Test
    @Transactional
    public void createDemandeAttestationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = demandeAttestationRepository.findAll().size();

        // Create the DemandeAttestation with an existing ID
        demandeAttestation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDemandeAttestationMockMvc.perform(post("/api/demande-attestations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demandeAttestation)))
            .andExpect(status().isBadRequest());

        // Validate the DemandeAttestation in the database
        List<DemandeAttestation> demandeAttestationList = demandeAttestationRepository.findAll();
        assertThat(demandeAttestationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDemandeAttestations() throws Exception {
        // Initialize the database
        demandeAttestationRepository.saveAndFlush(demandeAttestation);

        // Get all the demandeAttestationList
        restDemandeAttestationMockMvc.perform(get("/api/demande-attestations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(demandeAttestation.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastname").value(hasItem(DEFAULT_LASTNAME.toString())))
            .andExpect(jsonPath("$.[*].cause").value(hasItem(DEFAULT_CAUSE.toString())));
    }

    @Test
    @Transactional
    public void getDemandeAttestation() throws Exception {
        // Initialize the database
        demandeAttestationRepository.saveAndFlush(demandeAttestation);

        // Get the demandeAttestation
        restDemandeAttestationMockMvc.perform(get("/api/demande-attestations/{id}", demandeAttestation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(demandeAttestation.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.lastname").value(DEFAULT_LASTNAME.toString()))
            .andExpect(jsonPath("$.cause").value(DEFAULT_CAUSE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDemandeAttestation() throws Exception {
        // Get the demandeAttestation
        restDemandeAttestationMockMvc.perform(get("/api/demande-attestations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDemandeAttestation() throws Exception {
        // Initialize the database
        demandeAttestationRepository.saveAndFlush(demandeAttestation);
        int databaseSizeBeforeUpdate = demandeAttestationRepository.findAll().size();

        // Update the demandeAttestation
        DemandeAttestation updatedDemandeAttestation = demandeAttestationRepository.findOne(demandeAttestation.getId());
        // Disconnect from session so that the updates on updatedDemandeAttestation are not directly saved in db
        em.detach(updatedDemandeAttestation);
        updatedDemandeAttestation
            .name(UPDATED_NAME)
            .lastname(UPDATED_LASTNAME)
            .cause(UPDATED_CAUSE);

        restDemandeAttestationMockMvc.perform(put("/api/demande-attestations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDemandeAttestation)))
            .andExpect(status().isOk());

        // Validate the DemandeAttestation in the database
        List<DemandeAttestation> demandeAttestationList = demandeAttestationRepository.findAll();
        assertThat(demandeAttestationList).hasSize(databaseSizeBeforeUpdate);
        DemandeAttestation testDemandeAttestation = demandeAttestationList.get(demandeAttestationList.size() - 1);
        assertThat(testDemandeAttestation.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDemandeAttestation.getLastname()).isEqualTo(UPDATED_LASTNAME);
        assertThat(testDemandeAttestation.getCause()).isEqualTo(UPDATED_CAUSE);
    }

    @Test
    @Transactional
    public void updateNonExistingDemandeAttestation() throws Exception {
        int databaseSizeBeforeUpdate = demandeAttestationRepository.findAll().size();

        // Create the DemandeAttestation

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDemandeAttestationMockMvc.perform(put("/api/demande-attestations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(demandeAttestation)))
            .andExpect(status().isCreated());

        // Validate the DemandeAttestation in the database
        List<DemandeAttestation> demandeAttestationList = demandeAttestationRepository.findAll();
        assertThat(demandeAttestationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDemandeAttestation() throws Exception {
        // Initialize the database
        demandeAttestationRepository.saveAndFlush(demandeAttestation);
        int databaseSizeBeforeDelete = demandeAttestationRepository.findAll().size();

        // Get the demandeAttestation
        restDemandeAttestationMockMvc.perform(delete("/api/demande-attestations/{id}", demandeAttestation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DemandeAttestation> demandeAttestationList = demandeAttestationRepository.findAll();
        assertThat(demandeAttestationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DemandeAttestation.class);
        DemandeAttestation demandeAttestation1 = new DemandeAttestation();
        demandeAttestation1.setId(1L);
        DemandeAttestation demandeAttestation2 = new DemandeAttestation();
        demandeAttestation2.setId(demandeAttestation1.getId());
        assertThat(demandeAttestation1).isEqualTo(demandeAttestation2);
        demandeAttestation2.setId(2L);
        assertThat(demandeAttestation1).isNotEqualTo(demandeAttestation2);
        demandeAttestation1.setId(null);
        assertThat(demandeAttestation1).isNotEqualTo(demandeAttestation2);
    }
}
