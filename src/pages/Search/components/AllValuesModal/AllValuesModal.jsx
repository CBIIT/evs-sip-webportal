import {useState} from 'react';
import styles from './AllValuesModal.module.css'
import ReactPaginate from 'react-paginate';
import { Button, Modal, Table, Row, Col, Collapse, Badge, InputGroup, FormControl} from 'react-bootstrap';
import { PlusIcon, MinusIcon, SearchIcon } from '@/components/ui/icons/Icons';
import { searchFilter } from '../../../../shared';
import { apiGetGDCDataById } from '../../../../api';

const AllValuesModal = (props) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    apiGetGDCDataById(props.idterm).then(result => {
      setData(result);
      if (result.length !== 0 && result[0]._source.enum !== undefined) {
        setItems(result[0]._source.enum);
      }
    }).then(() => {
      setShow(true);
    });
  };


  const handleSearchChange = (event) => {
    let keyword = event.target.value.trim().replace(/\s{2,}/g, ' ').toLowerCase();

    if (keyword.length >= 3 && data !== undefined && data.length !== 0 && data[0]._source.enum !== undefined) {
      let newItem = searchFilter(data[0]._source.enum, keyword);
      setItems(newItem);
    } else {
      setItems(data[0]._source.enum);
    }
  };

  const TableSynonyms = (props) => {
    if (props.synonyms !== undefined) {
      return props.synonyms.map((item, index) =>
        <tr key={index}>
          <td dangerouslySetInnerHTML={{ __html: item.n }}></td>
          <td>{item.src}</td>
          <td>{item.t}</td>
        </tr>
      );
    }
    return (null);
  };

  const TableICDOSyn = (props) => {
    if (props.synonyms !== undefined) {
      return props.synonyms.map((item, index) =>
        <tr key={index}>
          <td dangerouslySetInnerHTML={{ __html: item.n }}></td>
          <td>{item.t}</td>
        </tr>
      );
    }
    return (null);
  };

  const TableNCIt = (props) => {

    let [isToggleOn, setIsToggleOn] = useState(false);

    const ToggleTableHandler = event => {
      event.preventDefault();
      setIsToggleOn(!isToggleOn);
    };
    return (
      <>
        <Row className={styles.row}>
          <Col xs={10} dangerouslySetInnerHTML={{ __html: props.ncit.l }}></Col>
          <Col className={styles['col-right']} xs={2}>
            <a href="/#" aria-label={isToggleOn === true ? 'collapse' : 'expand'} onClick={ToggleTableHandler}>
              {isToggleOn === true
                ? <MinusIcon/>
                : <PlusIcon/>
              }
            </a>
          </Col>
        </Row>
        <Collapse in={isToggleOn} mountOnEnter={true}>
          <div className={styles['table-container']}>
            <Table className={styles.table} striped bordered condensed="true" hover>
              <thead>
                <tr>
                  <th>Term</th>
                  <th>Source</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <TableSynonyms synonyms={props.ncit.s}/>
              </tbody>
            </Table>
          </div>
        </Collapse>
      </>
    );
  };

  const TableICDO3 = (props) => {

    let [isToggleOn, setIsToggleOn] = useState(false);

    const ToggleTableHandler = event => {
      event.preventDefault();
      setIsToggleOn(!isToggleOn);
    };
    return (
      <>
        <Row className={styles.row}>
          <Col xs={10}>
            <span dangerouslySetInnerHTML={{ __html: props.icdo.c }}></span> 
          </Col>
          <Col className={styles['col-right']} xs={2}>
            <a href="/#" aria-label={isToggleOn === true ? 'collapse' : 'expand'} onClick={ToggleTableHandler}>
              {isToggleOn === true
                ? <MinusIcon/>
                : <PlusIcon/>
              }
            </a>
          </Col>
        </Row>
        <Collapse in={isToggleOn} mountOnEnter={true}>
          <div className={styles['table-container']}>
            <Table className={styles.table} striped bordered condensed="true" hover>
              <thead>
                <tr>
                  <th>Term</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <TableICDOSyn synonyms={props.icdo.s}/>
              </tbody>
            </Table>
          </div>
        </Collapse>
      </>
    );
  };

  const TableEnums = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);

    const handlePageClick = (data) => {
      setCurrentPage(data.selected + 1);
    }

    if (props.items !== undefined && props.items.length !== 0) {

      // Logic for displaying current items
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = props.items.slice(indexOfFirstItem, indexOfLastItem);
      const pageCount = Math.ceil(props.items.length / itemsPerPage);


      // render table with items
      const renderItems = currentItems.map((e, index) => {
        if(e.ncit !== undefined && e.ncit.length !== 0) {
          return e.ncit.map((nc, i) => {
            if(i === 0) {
              return (
                <tr key={index}>
                  <td rowSpan={e.ncit.length} dangerouslySetInnerHTML={{ __html: e.n }}></td>
                  <td rowSpan={e.ncit.length}>
                    {e.icdo !== undefined &&
                      <TableICDO3 icdo={e.icdo} />
                    }
                  </td>
                  <td>
                    <a href={"https://ncit.nci.nih.gov/ncitbrowser/pages/concept_details.jsf?dictionary=NCI_Thesaurus&code=" + nc.c} rel="noopener noreferrer" target="_blank" dangerouslySetInnerHTML={{ __html: nc.c }}></a>
                  </td>
                  <td>
                    <TableNCIt ncit={nc}/>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={index}>
                  <td>
                    <a href={"https://ncit.nci.nih.gov/ncitbrowser/pages/concept_details.jsf?dictionary=NCI_Thesaurus&code=" + nc.c} rel="noopener noreferrer" target="_blank" dangerouslySetInnerHTML={{ __html: nc.c }}></a>
                  </td>
                  <td>
                    <TableNCIt ncit={nc}/>
                  </td>
                </tr>
              );
            }  
          });
        } else {
          return (<tr key={index}>
            <td dangerouslySetInnerHTML={{ __html: e.n }}></td>
            <td>
              {e.icdo !== undefined &&
                <TableICDO3 icdo={e.icdo} />
              }
            </td>
            <td></td>
            <td></td>
          </tr>)
        }
      });

      return (
      <>
        <div className={styles['main-table-container']}>
          <Table className={styles['main-table']} bordered condensed="true">
            <thead>
              <tr>
                <th>Values</th>
                <th>ICD-O-3 Code</th>
                <th>Mapped NCIt Code</th>
                <th>NCIt Preferred Term</th>
              </tr>
            </thead>
            <tbody>
              {renderItems}
            </tbody>
          </Table>
        </div>
        <div className={styles['pagination-container']}>
          <ReactPaginate
            previousLabel={'«'}
            prevClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextLabel={'»'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakLabel={'...'}
            breakClassName={'page-item break-me'}
            breakLinkClassName={'page-link'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </>
      )
    }
    return (null);
  };


  const TitleModal = (props) => {
    if (props.data !== undefined && props.data.length !== 0 && props.data[0]._source.prop !== undefined) {
      return(<>Values from {props.data[0]._source.prop.n}</>);
    }
    return (null);
  }


  const TotalLabel = (props) => {
    if (props.data !== undefined && props.data.length !== 0 && props.data[0]._source.enum !== undefined) {
      return(
        <Badge className={styles.badge} variant="primary">{props.data[0]._source.enum.length}</Badge>
      );
    }
    return (null);
  }

  return (
    <>
      <Button className={styles.button} variant="link" onClick={handleShow}>
        See All Values
      </Button>

      <Modal
        show={show} 
        onHide={handleClose}
        className={styles.modal}
        aria-labelledby="all-values-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="all-values-modal">
            <TitleModal data={data}/>
            <TotalLabel data={data}/>  
          </Modal.Title>
          <InputGroup className={styles['input-group']}>
            <InputGroup.Text id="search-values-input">
              <SearchIcon/>
            </InputGroup.Text>
            <FormControl
              placeholder="Type at least 3 characters"
              aria-label="Search"
              aria-describedby="Search"
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Modal.Header>
        <Modal.Body className={styles['modal-body']}>
          {(items !== undefined && items.length !== 0) ? (
            <TableEnums items={items}/>
          ) : (
            <div className={styles.indicator}>Sorry, no results found.</div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}


export default AllValuesModal;
