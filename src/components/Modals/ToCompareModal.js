import React, {useState} from 'react';
import { Button, Modal} from 'react-bootstrap';
import { apiGetGDCDataById } from '../../api';
// import { getAllSyn } from '../../../shared';


const ToCompareModal = (props) => {
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    apiGetGDCDataById(props.idterm).then(result => {
      setItems(result);
    }).then(() => {
      setShow(true);
    });
  };

  // const TableEnums = (props) => {
  //   if (props.items !== [] && props.items[0]._source.enum !== undefined) {
  //     return props.items[0]._source.enum.map((e, index) =>
  //       <tr key={index}>
  //         <td>{e.n}</td>
  //         <td></td>
  //         <td></td>
  //         <td></td>
  //       </tr>
  //     );
  //   }
  //   return (null);
  // };


  return (
    <>
      <Button variant="link" onClick={handleShow}>
        Compare with User List
      </Button>

      <Modal
        size="lg"
        show={show} 
        onHide={handleClose} 
        aria-labelledby="to-compare-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="to-compare-modal">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {JSON.stringify(items)}

          {/* <Table striped bordered condensed="true" hover>
            <thead>
              <tr>
                <th>Values</th>
                <th>ICD-O-3 Code</th>
                <th>Mapped NCIt Code</th>
                <th>NCIt Preferred Term</th>
              </tr>
            </thead>
            <tbody>
              <TableEnums items={items}/>
            </tbody>
          </Table> */}
        </Modal.Body>
      </Modal>
    </>
  );
}


export default ToCompareModal;
