import styles from './ChangeReport.module.css'
import {
  Button,
  Table,
  Pagination,
  InputGroup,
  FormControl,
  Tabs,
  Tab,
} from 'react-bootstrap'
import { SearchIcon, AngleDownIcon } from '../../components/ui/icons/Icons'
import DashboardContainer from '../../components/DashboardContainer/DashboardContainer'

const ChangeReport = () => {
  return (
    <DashboardContainer>
      <div className={styles['section-container']}>
        <div className={styles['section-header']}>
          <h2 className={styles['section-title']}>Change Report</h2>
          <div>
            <Button className={styles['button-green']}>Dowload Report</Button>{' '}
          </div>
        </div>

        <Tabs
          className={styles.tabs}
          defaultActiveKey="all"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="all" title="All">
            <div className={styles['table-container']}>
              <InputGroup className={styles['input-group']}>
                <FormControl
                  className={styles['form-control']}
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="btnGroupAddon"
                />
                <InputGroup.Text
                  className={styles['input-group-text']}
                  id="btnGroupAddon"
                >
                  <SearchIcon />
                </InputGroup.Text>
              </InputGroup>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Category/Node/Property</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {'biospecimen'}
                      <ul className={styles['table-ul']}>
                        <li className={styles['table-li']}>
                          <span className={styles['span-icon']}>
                            <AngleDownIcon />
                          </span>
                          {'read_group'}
                          <ul className={styles['table-ul']}>
                            <li className={styles['table-li']}>
                              <span className={styles['span-icon']}>
                                <AngleDownIcon />
                              </span>
                              {'chipseq_antibody'}
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                    <td>Property</td>
                    <td>Eye color</td>
                    <td>New property</td>
                  </tr>
                  <tr style={{ backgroundColor: '#fff496' }}>
                    <td>
                      {'clinical'}
                      <ul className={styles['table-ul']}>
                        <li className={styles['table-li']}>
                          <span className={styles['span-icon']}>
                            <AngleDownIcon />
                          </span>
                          {'follow_up'}
                          <ul className={styles['table-ul']}>
                            <li className={styles['table-li']}>
                              <span className={styles['span-icon']}>
                                <AngleDownIcon />
                              </span>
                              {'history_of_tumor'}
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                    <td>Property</td>
                    <td>History of Tumor</td>
                    <td>New property</td>
                  </tr>
                  <tr>
                    <td>
                      {'clinical'}
                      <ul className={styles['table-ul']}>
                        <li className={styles['table-li']}>
                          <span className={styles['span-icon']}>
                            <AngleDownIcon />
                          </span>
                          {'read_group'}
                          <ul className={styles['table-ul']}>
                            <li className={styles['table-li']}>
                              <span className={styles['span-icon']}>
                                <AngleDownIcon />
                              </span>
                              {'comorbidity'}
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                    <td>Value</td>
                    <td>Dermatomyosis</td>
                    <td>New value</td>
                  </tr>
                  <tr>
                    <td>
                      {'biospecimen'}
                      <ul className={styles['table-ul']}>
                        <li className={styles['table-li']}>
                          <span className={styles['span-icon']}>
                            <AngleDownIcon />
                          </span>
                          {'sample'}
                          <ul className={styles['table-ul']}>
                            <li className={styles['table-li']}>
                              <span className={styles['span-icon']}>
                                <AngleDownIcon />
                              </span>
                              {'is_ffpe'}
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                    <td>Property</td>
                    <td>is_ffpe</td>
                    <td>Deprecated</td>
                  </tr>
                </tbody>
              </Table>
              <div className={styles['pagination-container']}>
                <Pagination>
                  <Pagination.First />
                  <Pagination.Item active>{1}</Pagination.Item>
                  <Pagination.Item>{2}</Pagination.Item>
                  <Pagination.Item>{3}</Pagination.Item>
                  <Pagination.Item>{4}</Pagination.Item>
                  <Pagination.Item>{5}</Pagination.Item>
                  <Pagination.Last />
                </Pagination>
              </div>
            </div>
          </Tab>
          <Tab eventKey="unmapped" title="Unmapped">
            <p>test 2</p>
          </Tab>
          <Tab eventKey="mapped" title="Mapped">
            <p>test 3</p>
          </Tab>
          <Tab eventKey="conflict" title="Conflict">
            <p>test 4</p>
          </Tab>
        </Tabs>
      </div>
    </DashboardContainer>
  )
}

export default ChangeReport
