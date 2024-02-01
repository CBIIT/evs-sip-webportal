import { useState } from 'react'
import styles from './TableValue.module.css'
import { Row, Col, Collapse } from 'react-bootstrap'
import { MinusIcon, PlusIcon } from '@/components/ui/icons/Icons'
import NCItValue from './NCItValue/NCItValue'
import TabsContent from './TabsContent/TabsContent'
import ICDO3Value from './ICDO3Value/ICDO3Value'

const TableValue = ({ ncitName, nciTerms, icdo3Code, icdo3Synonyms }) => {
  let [isToggleOn, setIsToggleOn] = useState(false)

  const ToggleTableHandler = (event) => {
    event.preventDefault()
    setIsToggleOn(!isToggleOn)
  }

  return (
    <Col className={styles['table-col']} xs={12}>
      <Row>
        <Col xs={10}>
          {nciTerms?.length !== 0 || icdo3Synonyms !== undefined ? (
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
          {(nciTerms?.length !== 0 || icdo3Synonyms !== undefined) && (
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
      {(nciTerms?.length !== 0 || icdo3Synonyms !== undefined) && (
        <Collapse in={isToggleOn} mountOnEnter={true}>
          <div data-tag="ncit-values">
            {nciTerms?.length === 1 &&
              icdo3Synonyms === undefined &&
              nciTerms.map((nciTerm, index) => (
                <NCItValue key={index} nciTerm={nciTerm} />
              ))}
            {(nciTerms?.length > 1 || icdo3Synonyms !== undefined) && (
              <TabsContent
                nciTerms={nciTerms}
                icdo3Code={icdo3Code}
                icdo3Synonyms={icdo3Synonyms}
              />
            )}
            {nciTerms === undefined && icdo3Synonyms !== undefined && (
              <ICDO3Value icdo3Code={icdo3Code} icdo3Synonyms={icdo3Synonyms} />
            )}
          </div>
        </Collapse>
      )}
    </Col>
  )
}

export default TableValue
