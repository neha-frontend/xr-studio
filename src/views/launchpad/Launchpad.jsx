import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { CheckmarkDropdown } from '../../components/customDropdown/CustomDropdown';
import { Table } from 'react-bootstrap';
import { RIGHT_ARROW } from '../../assets/images';
import { Arrow_down } from '../../assets/images';
import { BACK_ARROW } from '../../assets/images';

import styles from './launchpad.module.scss';

// dummy filter for dropdown
const filter = [
  { label: 'All Experience', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'In Review', value: 'in review' },
  { label: 'Approved', value: 'approved' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Declined', value: 'declined' }
];

// dummy data for table
const data = [
  {
    name: 'Experience 1',
    status: 'In Review',
    published: 'Melody Ling',
    time_data: 'Today at 10:00 Pm'
  },
  {
    name: 'Experience 2',
    status: 'Declined',
    published: 'Melody Ling',
    time_data: 'Today at 1:00 Am'
  },
  {
    name: 'Experience 3',
    status: 'Active',
    published: 'Sung Wha Kang ',
    time_data: 'Yesterday at 1:00 Am'
  },
  {
    name: 'Experience 4',
    status: 'Inactive',
    published: 'Melody Ling',
    time_data: ''
  },
  {
    name: 'Experience 5',
    status: 'Approved',
    published: 'Sung Wha Kang',
    time_data: 'Yesterday at 12:00 Pm'
  },
  {
    name: 'Experience 6',
    status: 'Draft',
    published: 'Melody Ling',
    time_data: ''
  }
];

const Launchpad = () => {
  const getStatusClass = (status) => {
    let statusClass = '';
    switch (status) {
      case 'In Review':
        statusClass = styles.review;
        break;
      case 'Declined':
        statusClass = styles.declined;
        break;
      case 'Active':
        statusClass = styles.active;
        break;
      case 'Inactive':
        statusClass = styles.inactive;
        break;
      case 'Approved':
        statusClass = styles.approved;
        break;
      case 'Draft':
        statusClass = styles.draft;
        break;
      default:
        statusClass = '';
    }
    return statusClass;
  };

  return (
    <div className={styles.launchpad_body}>
      <div className={styles.back_arrow}>
        <img src={BACK_ARROW} alt="back_arrow" />
        <p className={styles.arrow_title}>My Teams</p>
      </div>
      <h1 className={styles.title}>Launchpad</h1>
      <div className="d-flex my-3">
        <span className="filter_name">Filters:</span>
        <CheckmarkDropdown
          dropdownItem={filter}
          selectedValue="all"
          handleFilter={() => {
            //function implementation after api integration
            return null;
          }}
        />
      </div>
      <div className="h-100">
        <InfiniteScroll className="h-100" dataLength={0}>
          <Table className={styles.table_responsive}>
            <thead className={styles.launchpad_table}>
              <tr>
                <th className={styles.table_head}>
                  Name{' '}
                  <span className={styles.arrow_img}>
                    <img src={Arrow_down} alt="down_arrow" width="100%" />
                  </span>
                </th>
                <th className={styles.table_head}> Status</th>
                <th className={styles.table_head}>Published By</th>
                <th className={styles.table_head}>Time/Date Published</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.name}>
                  <td className={styles.table_body}>{item.name}</td>
                  <td className={styles.table_body}>
                    <span className={`${styles.status} ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className={styles.table_body}>{item.published}</td>
                  <td className={styles.table_body}>
                    <span className={styles.time_content}>
                      <h6>{item.time_data}</h6>
                      <span className={styles.arrow}>
                        <img src={RIGHT_ARROW} alt="arrow" width="100%" />
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Launchpad;
