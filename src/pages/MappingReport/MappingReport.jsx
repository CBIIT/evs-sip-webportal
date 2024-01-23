import styles from './MappingReport.module.css'
import {
  Container,
  Nav,
  NavDropdown,
  Row,
  Button,
  Col,
  Table,
  Pagination,
  InputGroup,
  FormControl,
  Tabs,
  Tab,
} from 'react-bootstrap'
import { AngleDownIcon, SearchIcon } from '../../components/ui/icons/Icons'

const MappingReport = () => {
  return (
    <div className={styles.page}>
      <div className={styles['page-container']}>
        <h1 className={styles['title-container']}>
          <h1 className={styles['page-title']}>My Dashboard</h1>
        </h1>
        <Container className={styles.container}>
          <Row>
            <Col sm={3}>
              <Nav className="flex-column">
                <Nav.Item>
                  <Nav.Link className={styles['nav-link']}>
                    Model Builder
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className={styles['nav-link']}>Link</Nav.Link>
                </Nav.Item>
                <NavDropdown
                  className={styles['nav-dropdown']}
                  title="Published Data Sources"
                  id="nav-dropdown"
                >
                  <NavDropdown.Item className={styles['nav-dropdown-item']}>
                    GDC
                  </NavDropdown.Item>
                  <NavDropdown.Item className={styles['nav-dropdown-item']}>
                    CTDC
                  </NavDropdown.Item>
                  <NavDropdown.Item className={styles['nav-dropdown-item']}>
                    ICDC
                  </NavDropdown.Item>
                  <NavDropdown.Item className={styles['nav-dropdown-item']}>
                    PCDC
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  className={styles['nav-dropdown']}
                  title="Unpublished Data Sources"
                  id="nav-dropdown"
                >
                  <NavDropdown.Item className={styles['nav-dropdown-item']}>
                    PDC
                  </NavDropdown.Item>
                  <NavDropdown.Item className={styles['nav-dropdown-item']}>
                    IDC
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Item>
                  <Nav.Link className={styles['nav-link']}>
                    User Management
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className={styles['nav-link']}>Sign Out</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <div className={styles['section-container']}>
                <div className={styles['section-header']}>
                  <h2 className={styles['section-title']}>Mapping Report</h2>
                  <div>
                    <Button className={styles['button-green']}>
                      Dowload Results
                    </Button>
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
                            <th rowSpan="2" style={{ verticalAlign: 'middle' }}>
                              Category/Node/Property
                            </th>
                            <th colSpan="2">GDC Dictionay</th>
                            <th colSpan="2">Mapped GDC Values</th>
                          </tr>
                          <tr>
                            <th>Values</th>
                            <th>NCItcode</th>
                            <th>Values</th>
                            <th>NCItcode</th>
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
                            <td>Not allowed to collect</td>
                            <td>C141478</td>
                          </tr>
                          <tr>
                            <td>Unknown</td>
                            <td>C17998</td>
                            <td>Unknown</td>
                            <td>C17998</td>
                          </tr>
                          <tr>
                            <td>Not Reported</td>
                            <td>C43234</td>
                            <td>Not Reported</td>
                            <td>C43234</td>
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
                            <td>H3K4me1</td>
                            <td>C141478</td>
                          </tr>
                          <tr>
                            <td>Input Control</td>
                            <td>C17998</td>
                            <td>Input Control</td>
                            <td>C17998</td>
                          </tr>
                          <tr>
                            <td>H3K27ac</td>
                            <td>C43234</td>
                            <td>H3K27ac</td>
                            <td>C43234</td>
                          </tr>
                          <tr>
                            <td>H3K27ac</td>
                            <td>C43234</td>
                            <td>H3K27ac</td>
                            <td>C43234</td>
                          </tr>
                          <tr>
                            <td>H3K27ac</td>
                            <td>C43234</td>
                            <td>H3K27ac</td>
                            <td>C43234</td>
                          </tr>
                          <tr>
                            <td>H3K27me3</td>
                            <td>C43234</td>
                            <td>H3K27me3</td>
                            <td>C43234</td>
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
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default MappingReport
