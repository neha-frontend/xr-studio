import React, { useState, memo } from 'react';
import { Dropdown } from 'react-bootstrap';

import { DD_CHECKMARK, DOWN_ARROW, THREE_DOT } from '../../assets/images';

import styles from './customDropdown.module.scss';

const CheckmarkDropdown = memo(function CheckmarkDropdown({
  dropdownItem = [],
  selectedValue = '',
  className = '',
  id = '',
  action,
  updatePermission,
  handleFilter,
  dropDownType
}) {
  const [selectedOption, setSelectedOption] = useState(selectedValue);

  const updateMemberRole = (value) => {
    setSelectedOption(value);
  };

  const handleSelect = (option) => {
    if (dropDownType === 'changeRole') {
      if (id.length > 0) {
        const data = {
          role: option
        };
        action(id, data, updateMemberRole);
      } else {
        setSelectedOption(option);
        updatePermission(option);
      }
    } else {
      setSelectedOption(option);
      handleFilter(option);
    }
  };

  return (
    <Dropdown className={styles.edit_dropdown}>
      <Dropdown.Toggle className={`${styles.edit_toggle} ${className}`}>
        {dropdownItem.find((option) => option.value === selectedOption)?.label}
        <img src={DOWN_ARROW} alt="down_arrow" className="ms-2" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {dropdownItem.map((option) => (
          <div className="d-flex" key={option.value}>
            <Dropdown.Item
              className={
                selectedOption === option.value ? styles.selected_item : styles.filter_item
              }
              eventKey={option.value}
              onClick={() => handleSelect(option.value)}>
              <div className={styles.dd_check}>
                {selectedOption === option.value ? <img src={DD_CHECKMARK} alt="checkmark" /> : ''}
              </div>
              {option.label}
            </Dropdown.Item>
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
});

const SimpleDropdown = memo(function SimpleDropdown({
  dropdownItem = [],
  userId,
  id,
  email,
  role,
  showReinvite,
  collapse,
  handleInvite,
  copyToClipboard,
  removeMember,
  handleTransferOwnership
}) {
  const handleAction = ({ id, email, value }) => {
    switch (value) {
      case 'remove':
        removeMember(id);
        break;
      case 'copyEmail':
        copyToClipboard(email, 'Email copied to clipboard');
        break;
      case 'resentInvite':
        handleInvite(email, role);
        break;
      case 'transfer':
        handleTransferOwnership(userId);
        break;
      default:
        null;
        return;
    }
  };

  return (
    <Dropdown className={styles.edit_dropdown}>
      <Dropdown.Toggle className={styles.edit_toggle}>
        {collapse === 'horizontal' ? (
          <img src={THREE_DOT} alt="dot" className={styles.dot_img} />
        ) : (
          <span className={styles.dot_dd}>...</span>
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {dropdownItem.map((item) => {
          switch (item.value) {
            case 'resentInvite':
              if (showReinvite) {
                return (
                  <Dropdown.Item
                    key={item.label}
                    eventKey={item.value}
                    className={styles.simpledd_item}
                    onClick={() => handleAction({ id, email, value: item.value })}>
                    {item.label}
                  </Dropdown.Item>
                );
              }
              break;
            case 'transfer':
              if (!showReinvite && role === 'admin') {
                return (
                  <Dropdown.Item
                    key={item.label}
                    eventKey={item.value}
                    className={styles.simpledd_item}
                    onClick={() => handleAction({ id, email, value: item.value })}>
                    {item.label}
                  </Dropdown.Item>
                );
              }
              break;
            case 'remove':
              if (role !== 'owner') {
                return (
                  <Dropdown.Item
                    key={item.label}
                    eventKey={item.value}
                    className={styles.simpledd_item}
                    onClick={() => handleAction({ id, email, value: item.value })}>
                    {item.label}
                  </Dropdown.Item>
                );
              }
              break;
            default:
              if (item.value !== 'resentInvite' && item.value !== 'transfer') {
                return (
                  <Dropdown.Item
                    key={item.label}
                    eventKey={item.value}
                    className={styles.simpledd_item}
                    onClick={() => handleAction({ id, email, value: item.value })}>
                    {item.label}
                  </Dropdown.Item>
                );
              }
              break;
          }
          return null;
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
});

const MultisectionDropdown = memo(function MultisectionDropdown({
  updatefilter,
  selectedSort = '',
  seectedOrder = ''
}) {
  const [selected, setSelected] = useState(null);
  const [sort, setSort] = useState(selectedSort);
  const [order, setOrder] = useState(seectedOrder);
  const Sort = [
    { id: 0, value: 'name', label: 'Alphabetical' },
    { id: 1, value: '-createdAt', label: 'Date Created' },
    { id: 1, value: 'lastEdit', label: 'Last Edited' }
  ];
  const Order = [
    { id: 1, value: '-createdAt', label: 'Newest First' },
    { id: 1, value: 'createdAt', label: 'Oldest First' },
    { id: 0, value: 'name', label: 'A - Z' },
    { id: 0, value: '-name', label: 'Z - A' }
  ];

  const handleFilter = (type, option) => {
    let sortFilter = sort;
    if (type === 'sort') {
      setSelected(option);
      setSort(option.label);
      if (option.value === 'name') setOrder('A - Z');
      else setOrder('Newest First');
      sortFilter = option.label;
    } else if (sort.length > 0) setOrder(option.label);
    if (sortFilter.length > 0) updatefilter(option.value);
  };

  const sortSection = !selected
    ? Order.filter((item) => item.id === 1)
    : Order.filter((item) => item.id === selected?.id);

  return (
    <Dropdown>
      <Dropdown.Toggle className={styles.edit_toggle}>
        {!sort ? 'Select Filter' : sort}
        <img src={DOWN_ARROW} alt="down_arrow" className="ms-2 mb-1" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <React.Fragment>
          <Dropdown.Header className={styles.multisectiondd_header}>Sort By</Dropdown.Header>
          {Sort.map((option) => (
            <Dropdown.Item
              key={option.value}
              eventKey={option}
              onClick={() => handleFilter('sort', option)}
              className={`d-flex
                  ${sort === option.label ? styles.selected_item : styles.filter_item}`}>
              <div className={styles.dd_check}>
                {sort === option.label && <img src={DD_CHECKMARK} alt="checkmark" />}
              </div>
              {option.label}
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />
          <React.Fragment>
            <Dropdown.Header className={styles.multisectiondd_header}>Order</Dropdown.Header>
            {sortSection.map((option) => (
              <Dropdown.Item
                key={option.value}
                eventKey={option}
                onClick={() => handleFilter('order', option)}
                className={`d-flex
                  ${order === option.label ? styles.selected_item : styles.filter_item}`}>
                <div className={styles.dd_check}>
                  {order === option.label && <img src={DD_CHECKMARK} alt="checkmark" />}
                </div>
                {option.label}
              </Dropdown.Item>
            ))}
          </React.Fragment>
        </React.Fragment>
      </Dropdown.Menu>
    </Dropdown>
  );
});

const ChatDropdown = memo(function ChatDropdown({ dropdownItem }) {
  return (
    <Dropdown className={styles.edit_dropdown}>
      <Dropdown.Toggle className={styles.edit_toggle}>
        <img src={THREE_DOT} alt="dot" className={styles.chat_toggle} />
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles.chat_menu}>
        {dropdownItem.map((item) => (
          <Dropdown.Item
            key={item.label}
            eventKey={item.value}
            className={styles.chat_item}
            onClick={item.action}>
            <div className="d-flex justify-content-between">
              <div>{item.label}</div>
              <div>
                <img src={item.image} alt={item.label} />
              </div>
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
});

const CardDropdown = memo(function CardDropdown({ dropdownItem = [], collapse }) {
  return (
    <Dropdown className={styles.edit_dropdown}>
      <Dropdown.Toggle className={styles.edit_toggle}>
        {collapse === 'horizontal' ? (
          <img src={THREE_DOT} alt="dot" className={styles.dot_img} />
        ) : (
          <span className={styles.dot_dd}>...</span>
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {dropdownItem.map((item) => (
          <Dropdown.Item
            key={item.label}
            eventKey={item.value}
            className={styles.simpledd_item}
            onClick={() => item.action()}>
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
});

export { CheckmarkDropdown, SimpleDropdown, MultisectionDropdown, ChatDropdown, CardDropdown };
