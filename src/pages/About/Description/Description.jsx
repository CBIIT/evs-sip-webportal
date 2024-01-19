import styles from './Description.module.css'

const Description = () => {
  return (
    <div className={styles.box}>
      <div className={styles.title}>About EVS-SIP</div>
      <div className={styles.content}>
        <p>
          The EVS Semantic Integration Platform (EVS-SIP) is a service developed
          and maintained by the National Cancer Institute (NCI){' '}
          <a
            href="https://evs.nci.nih.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Enterprise Vocabulary Service (EVS)
          </a>
          . The EVS-SIP permits search and retrieval of terms contained in or
          across the data dictionaries or data models of repositories
          participating in the Cancer Research Data Commons (CRDC) and beyond.
        </p>
        <p>
          The purpose of the EVS-SIP is the identification of semantically
          similar concepts across multiple sources. Semantic similarity or
          synonymy is inferred from mappings to the NCI Thesaurus. Subject
          matter experts provide mappings from terms that are native to the data
          source to concepts contained in the NCI Thesaurus.
        </p>
        <p>
          Mapping from native terminology to NCIt standard terminology permits
          search and retrieval by leveraging synonyms found in NCI Thesaurus,
          rather than using synonyms that would otherwise need to be stored in a
          data repository. Additionally, EVS-SIP provides references to external
          data standards through relationships defined and maintained by NCI
          Thesaurus. The platform also promotes reuse and harmonization of
          terminology across multiple data repositories by providing
          relationships between the terms in each catalogue and visual
          representations of the models used for data collection.
        </p>
      </div>
    </div>
  )
}

export default Description
