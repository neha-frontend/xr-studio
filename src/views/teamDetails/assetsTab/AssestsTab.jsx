import React from 'react';

import {
  CheckmarkDropdown,
  MultisectionDropdown
} from '../../../components/customDropdown/CustomDropdown';
import AssetsCard from './AssestsCard';

import styles from './assests.module.scss';
import { Grid } from '@material-ui/core';
import AssetName from '../../../components/modal/assetName/AssetName';
import { useDispatch } from 'react-redux';
import { showCustomModal } from '../../../store/sagaActions';
import {
  ASSET_NAME_MODAL,
  DELETE_TEAM_MODAL,
  RENAME_TEAM_MODAL
} from '../../../constants/modalTypeConstant';
import DeleteTeam from '../../../components/modal/deleteTeam/DeleteTeam';
import RenameTeam from '../../../components/modal/renameTeam/RenameTeam';

const Assets = () => {
  const items = [];
  const dispatch = useDispatch();
  const handleViewDetails = () => {
    dispatch(
      showCustomModal({
        customModalType: ASSET_NAME_MODAL
      })
    );
  };
  const handleDelete = () => {
    dispatch(showCustomModal({ customModalType: DELETE_TEAM_MODAL }));
  };
  const handleRename = () => {
    dispatch(showCustomModal({ customModalType: RENAME_TEAM_MODAL }));
  };

  const DropdownItems = [
    { label: 'View Details', value: 'detail', action: handleViewDetails },
    { label: 'Rename', value: 'rename', action: handleRename },
    { label: 'Delete', value: 'delete', action: handleDelete }
  ];

  const filterOptions = [
    { label: 'All Assets', value: 'all' },
    { label: 'Image', value: 'image' },
    { label: 'Audio', value: 'audio' },
    { label: 'Video', value: 'video' },
    { label: '3D Assets', value: '3d' }
  ];

  return (
    <>
      <div className={styles.filter_head}>
        <div className="d-flex">
          <span className="filter_name">Filters:</span>
          <CheckmarkDropdown dropdownItem={filterOptions} selectedValue="all" />
        </div>
        <div className="d-flex">
          <span className="filter_name">Sort : </span>
          <MultisectionDropdown />
        </div>
      </div>
      <Grid container spacing={2} className={styles.teamCard}>
        {items?.length ? (
          items.map((index) => (
            <Grid item lg={3} sm={4} xs={6} key={index}>
              <AssetsCard dropdown={DropdownItems} />
            </Grid>
          ))
        ) : (
          <div className="no_data mt-5">No Assets yet</div>
        )}
      </Grid>
      <AssetName />
      <DeleteTeam />
      <RenameTeam />
    </>
  );
};

export default Assets;
