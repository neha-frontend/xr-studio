import { Grid } from '@material-ui/core';

import AssetsCard from '../assetsTab/AssestsCard';
import {
  CheckmarkDropdown,
  MultisectionDropdown
} from '../../../components/customDropdown/CustomDropdown';

import styles from './experience.module.scss';
import DeleteTeam from '../../../components/modal/deleteTeam/DeleteTeam';
import { useDispatch } from 'react-redux';
import { showCustomModal } from '../../../store/sagaActions';
import { DELETE_TEAM_MODAL, RENAME_TEAM_MODAL } from '../../../constants/modalTypeConstant';
import RenameTeam from '../../../components/modal/renameTeam/RenameTeam';

const Experience = ({ filter }) => {
  const items = [];
  const dispatch = useDispatch();
  const data = {
    name: 'experience',
    type: 'experience'
  };
  const handleDelete = () => {
    dispatch(showCustomModal({ customModalType: DELETE_TEAM_MODAL, tempCustomModalData: data }));
  };
  const handleRename = () => {
    dispatch(showCustomModal({ customModalType: RENAME_TEAM_MODAL, tempCustomModalData: data }));
  };
  const DropdownItems = [
    { label: 'Share', value: 'share' },
    { label: 'Rename', value: 'rename', action: handleRename },
    { label: 'Duplicate', value: 'duplicate' },
    { label: 'Delete', value: 'delete', action: handleDelete }
  ];
  return (
    <>
      <div className={styles.filter_head}>
        <div className="d-flex">
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
        <div className="d-flex">
          <span className="filter_name">Sort : </span>
          <MultisectionDropdown />
        </div>
      </div>
      <Grid container spacing={2} className={styles.teamCard}>
        {items?.length ? items.map((index) => (
          <Grid item lg={3} sm={4} xs={6} key={index}>
            <AssetsCard experience={true} dropdown={DropdownItems} />
          </Grid>
        ))  : (
          <div className="no_data mt-5">No experiences yet</div>
        )}
      </Grid>
      <DeleteTeam />
      <RenameTeam />
    </>
  );
};

export default Experience;
