import { useEffect } from 'react'
import styles from './index.module.css';
import { Button, Table, Pagination, InputGroup, FormControl, Tabs, Tab } from 'react-bootstrap'
import { SearchIcon, AngleDownIcon, EditIcon, TimesIcon } from '../../components/ui/icons/Icons'

import BatchUpdateModal from '../../components/Modals/BatchUpdateModal'
import DashboardContainer from '../../components/DashboardContainer/DashboardContainer'

const PCDCSource = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <DashboardContainer>
      <div className={styles['section-container']}>
        <div className={styles['section-header']}>
          <h2 className={styles['section-title']}>Pedriactic Cancer Data Model</h2>
          <div>
            <Button className={styles['button-blue']}>Graphic View</Button> <Button className={styles['button-gray']}>Model Update</Button> <br />
            <BatchUpdateModal /> <Button className={styles['button-dark-blue']}>Change Report</Button>{' '}
          </div>
        </div>
        <div className={styles['table-container']}>
          <InputGroup className={styles['input-group-styled']}>
            <FormControl className={styles['form-control-styled']} type="text" placeholder="Search" aria-label="Search" aria-describedby="btnGroupAddon" />
            <InputGroup.Text className={styles['input-group-text-styled']} id="btnGroupAddon">
              <SearchIcon />
            </InputGroup.Text>
          </InputGroup>
          <Tabs defaultActiveKey="values" id="uncontrolled-tab-example">
            <Tab eventKey="values" title="Values">
              <div>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Category/Node/Property</th>
                      <th>Values</th>
                      <th>NCItcode</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan="3">
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
                      <td>Not allowed to collect</td>
                      <td>C141478</td>
                      <td>
                        <a className={styles['action-link']} href="/#" aria-label="edit">
                          <EditIcon />
                        </a>
                        <a className={styles['action-link']} href="/#" aria-label="edit">
                          <TimesIcon />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Unknown</td>
                      <td>C17998</td>
                      <td>
                        <a className={styles['action-link']} href="/#" aria-label="edit">
                          <EditIcon />
                        </a>
                        <a className={styles['action-link']} href="/#" aria-label="edit">
                          <TimesIcon />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Not Reported</td>
                      <td>C43234</td>
                      <td>
                        <a className={styles['action-link']} href="/#" aria-label="edit">
                          <EditIcon />
                        </a>
                        <a className={styles['action-link']} href="/#" aria-label="edit">
                          <TimesIcon />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td rowSpan="6">
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
                      <td>H3K4me1</td>
                      <td>C141478</td>
                      <td>
                        <a className={styles['action-link']} href="/#" aria-label="edit">
                          <EditIcon />
                        </a>
                        <a className={styles['action-link']} href="/#" aria-label="edit">
                          <TimesIcon />
                        </a>
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: '#fff496' }}>
                      <td>Input Control</td>
                      <td>C17998</td>
                      <td>
                        <a className={styles['action-link']} href="/#" aria-label="edit">
                          <EditIcon />
                        </a>
                        <a className={styles['action-link']} href="/#" aria-label="edit">
                          <TimesIcon />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>H3K27ac</td>
                      <td>C43234</td>
                      <td>
                        <a className={styles['action-link']}ink href="/#" aria-label="edit">
                          <EditIcon />
                        </a>
                        <a className={styles['action-link']} href="/#" aria-label="edit">
                          <TimesIcon />
                        </a>
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: '#fff496' }}>
                      <td>H3K27ac</td>
                      <td>C43234</td>
                      <td>
                        <a className={styles['action-link']} href="/#" aria-label="edit">
                          <EditIcon />
                        </a>
                        <a className={styles['action-link']}nLink href="/#" aria-label="edit">
                          <TimesIcon />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>H3K27ac</td>
                      <td>C43234</td>
                      <td>
                        <a className={styles['action-link']} href="/#" aria-label="edit">
                          <EditIcon />
                        </a>
                        <a className={styles['action-link']} href="/#" aria-label="edit">
                          <TimesIcon />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>H3K27me3</td>
                      <td>C43234</td>
                      <td>
                        <a className={styles['action-link']} href="/#" aria-label="edit">
                          <EditIcon />
                        </a>
                        <a className={styles['action-link']}Link href="/#" aria-label="edit">
                          <TimesIcon />
                        </a>
                      </td>
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
            <Tab eventKey="props" title="Properties">
              <p>test 2</p>
            </Tab>
            <Tab eventKey="nodes" title="Nodes">
              <p>test 3</p>
            </Tab>
          </Tabs>
        </div>
      </div>
    </DashboardContainer>
  )
}

export default PCDCSource
