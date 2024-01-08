import React from 'react';
import styles from './TableDiff.module.css';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import TableDiff from './TableDiff';
import PaginationController from './PaginationController';

const TabsController = (props) => {
  return (
    <>
      <Tab.Container 
        id="tabs-controller" 
        defaultActiveKey="all"
        activeKey={props.type}
        onSelect={props.selectTab}>
          <Row className="clearfix">
            <Col style={styles['tab-navs-col']} sm={12}>
              <Nav styles={styles['nav-styled']} variant="tabs">
                <Nav.Item>
                  <Nav.Link style={styles['nav-link-styled']} eventKey="all">All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link style={styles['nav-link-styled']} eventKey="unmapped">Unmapped</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link style={styles['nav-link-styled']} eventKey="mapped">Mapped</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link style={styles['nav-link-styled']} eventKey="conflict">Conflict</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content transition="false" style={{"fontSize": "1rem", "border": "1px solid #535F74", "borderRadius": "5px", "padding": "5px 5px 0px 5px"}}>
                <Tab.Pane unmountOnExit={true} eventKey="all">
                  <TableDiff result={props.result} tabKey='all' search={props.search} setSearch={props.setSearch} searchSubmit={props.searchSubmit} downloadResult={props.downloadResult}/>
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="unmapped">
                  <TableDiff result={props.result} tabKey='unmapped' search={props.search} setSearch={props.setSearch} searchSubmit={props.searchSubmit} downloadResult={props.downloadResult}/>
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="mapped">
                  <TableDiff result={props.result} tabKey='mapped' search={props.search} setSearch={props.setSearch} searchSubmit={props.searchSubmit} downloadResult={props.downloadResult}/>
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="conflict">
                  <TableDiff result={props.result} tabKey='conflict' search={props.search} setSearch={props.setSearch} searchSubmit={props.searchSubmit} downloadResult={props.downloadResult}/>
                </Tab.Pane>
                {props.result.length !== 0 && 
                  <PaginationController pageClick={props.pageClick} type={props.type} pageSizeChange={props.pageSizeChange} currentPage={props.currentPage} pageSize={props.pageSize} pageCount={props.pageCount} total={props.total}/>
                }
              </Tab.Content>
            </Col>
          </Row>
      </Tab.Container>
    </>
  );
};

export default TabsController;
