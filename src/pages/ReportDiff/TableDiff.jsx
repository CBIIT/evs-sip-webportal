import styles from './TableDiff.module.css';
import { Form, Button, Table, Col, InputGroup } from 'react-bootstrap';
import { SearchIcon, AngleDownIcon } from '../../components/ui/icons/Icons';

const TableDiff = (props) => {
  let groupCount = {};
  let tableData = Object.assign([], props.result);
  tableData.forEach((entry) => {
    entry.id = entry.p + '/' + entry.n + '/' + entry.c;
    if (groupCount[entry.id]) {
      groupCount[entry.id]++;
    }
    else {
      groupCount[entry.id] = 1;
    }
  });

  const handleSearchChange = (event) => {
    props.setSearch({
      ...props.search,
      [props.tabKey]: event.target.value
    });
  };

  return <>
    <div className={styles['search-container']}>
      <Form className={styles['form-styled']} onSubmit={props.searchSubmit}>
        <Form.Row>
          <Col sm={12}>
            <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
              Search By Text
            </Form.Label>
            <InputGroup>
              <Form.Control
                id="inlineFormInputGroupUsername"
                placeholder="Search By Text"
                aria-label="Search By Text"
                aria-describedby="Search By Text"
                value={props.search[props.tabKey]}
                onChange={handleSearchChange}
              />
              <InputGroup.Append>
                <Button type="submit" value="Submit"><SearchIcon /></Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Form.Row>
      </Form>
      {tableData.length !== 0 &&
        <Button variant="success" onClick={props.downloadResult} className="ml-auto">
          Download Result
        </Button>
      }
    </div>
    <div className={styles['search-container']}>
      {tableData.length !== 0 ?
        <Table bordered>
          <thead style={{ backgroundColor: "#535F74", color: "white", textAlign: "center" }}>
            <tr>
              <th rowSpan="2" width="10%">Category / Node / Property</th>
              <th colSpan="2" width="30%">GDC Dictionary</th>
              <th colSpan="2" width="30%">Mapped GDC Values</th>
            </tr>
            <tr>
              <th>Value</th>
              <th>NCIt Code</th>
              <th>Value</th>
              <th>NCIt Code</th>
            </tr>
          </thead>
          <tbody>
            {
              tableData.map((item, index) => {
                let rowSpan = 0;
                if (index === 0) {
                  rowSpan = groupCount[item.id];
                }
                else {
                  rowSpan = tableData[index].id === tableData[index - 1].id ? 0 : groupCount[item.id];
                }
                if (rowSpan > 0) {
                  return (
                    <tr key={index}>
                      <td rowSpan={rowSpan}>
                        {item.c}
                        <ul className={styles['table-ul']}>
                          <li className={styles['table-li']}><span className={styles['span-icon']}><AngleDownIcon /></span>{item.n}
                            <ul className={styles['table-ul']}>
                              <li className={styles['table-li']}><span className={styles['span-icon']}><AngleDownIcon /></span>{item.p}</li>
                            </ul>
                          </li>
                        </ul>
                      </td>
                      <td>{item.v_1}</td>
                      <td>{item.n_1}</td>
                      <td>{item.v_2}</td>
                      <td>{item.n_2}</td>
                    </tr>
                  );
                }
                else {
                  return (
                    <tr key={index}>
                      <td>{item.v_1}</td>
                      <td>{item.n_1}</td>
                      <td>{item.v_2}</td>
                      <td>{item.n_2}</td>
                    </tr>
                  );
                }
              })
            }
          </tbody>
        </Table>
        :
        <div className={styles['indicator']}>
          <div className={styles['indicator-content']}>
            Sorry, no results found.
          </div>
        </div>
      }
    </div>
  </>
}

export default TableDiff;
