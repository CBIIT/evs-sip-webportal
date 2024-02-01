import { useState } from 'react'
import styles from './TableValue.module.css'
import { Row, Col, Collapse } from 'react-bootstrap'
import { MinusIcon, PlusIcon } from '@/components/ui/icons/Icons'
import TabsContent from './TabsContent/TabsContent'
import TermValue from './TermValue/TermValue'

const TableValue = ({ ncitName, nciTerms, icdo3Code, icdo3Synonyms }) => {
  let [isToggleOn, setIsToggleOn] = useState(false)

  // merge icdo3Code and icdo3Synonyms
  const icdo3Term = icdo3Code &&
    icdo3Synonyms && { ...icdo3Code, syns: icdo3Synonyms }

  const ToggleTableHandler = (event) => {
    event.preventDefault()
    setIsToggleOn(!isToggleOn)
  }

  return (
    <Col className={styles['table-col']} xs={12}>
      <Row>
        <Col xs={10}>
          {nciTerms?.length !== 0 || icdo3Term !== undefined ? (
            <a
              href="/#"
              dangerouslySetInnerHTML={{ __html: ncitName }}
              onClick={ToggleTableHandler}
            ></a>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: ncitName }}></span>
          )}
        </Col>
        <Col className={styles['col-right']} xs={2}>
          {(nciTerms?.length !== 0 || icdo3Term !== undefined) && (
            <a
              href="/#"
              aria-label={isToggleOn === true ? 'collapse' : 'expand'}
              onClick={ToggleTableHandler}
            >
              {isToggleOn === true ? <MinusIcon /> : <PlusIcon />}
            </a>
          )}
        </Col>
      </Row>
      {(nciTerms?.length !== 0 || icdo3Term !== undefined) && (
        <Collapse in={isToggleOn} mountOnEnter={true}>
          <div data-tag="ncit-values">
            {nciTerms?.length === 1 &&
              icdo3Term === undefined &&
              nciTerms.map((nciTerm, index) => (
                <TermValue key={index} type="ncit" term={nciTerm} />
              ))}
            {(nciTerms?.length > 1 || icdo3Term !== undefined) && (
              <TabsContent nciTerms={nciTerms} icdo3Term={icdo3Term} />
            )}
            {nciTerms === undefined && icdo3Term !== undefined && (
              <TermValue type="icdo3" term={icdo3Term} />
            )}
          </div>
        </Collapse>
      )}
    </Col>
  )
}

export default TableValue
