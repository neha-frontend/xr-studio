import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import { DOWN_ARROW } from '../../assets/images';

import './CustomAccordion.css';

const CustomAccordion = (props) => {
  const { data, titleClassName, mainClassName = '' } = props;
  // const [accordianObject, setAccordianObject] = useState({});
  const [SelectedID, setSelectedId] = useState('');
  function CustomToggle({ children, eventKey, itemId }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {
      if (SelectedID === itemId) {
        setSelectedId('');
      } else {
        setSelectedId(itemId);
      }
    });
    return (
      <button type="button" className="plus-btn" onClick={decoratedOnClick}>
        {children}
      </button>
    );
  }
  return (
    <div className={`${mainClassName}`}>
      <Accordion defaultActiveKey="0">
        {data.map((items, index) => (
          <div key={items.id} className={SelectedID === items.id ? 'active' : ''}>
            <div className='accordion_body'>
              <div className="d-flex justify-content-between">
                <div className="w-100 mt-3 accordion_title">
                  <div className={titleClassName}><items.title/></div>
                </div>
                <CustomToggle eventKey={index + 1} itemId={items.id} id={index + 1}>
                  {SelectedID === items.id ? (
                    <img src={DOWN_ARROW} alt="arrow" />
                  ) : (
                    <img src={DOWN_ARROW} alt="arrow" className="expand_arrow" />
                  )}
                </CustomToggle>
              </div>
              <Accordion.Collapse
                eventKey={index + 1}
                // onClick={() => console.log('accordian opened')}
              >
                <Card.Body className="faqinfo">
                  <items.body />
                </Card.Body>
              </Accordion.Collapse>
            </div>
            {/* <hr className="mt-0" /> */}
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default CustomAccordion;
