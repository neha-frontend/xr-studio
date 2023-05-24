import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { PLUS } from '../../assets/images';
import { experienceTabs } from './experienceTab';
import Assets from '../teamDetails/assetsTab/AssestsTab';
import Experience from '../teamDetails/experience/Experience';
import CreateNewTeam from '../../components/modal/createNewTeam/CreateNewTeam';
import PublishExperience from '../../components/modal/publishExperience/PublishExperience';

import styles from '../teamDetails/teamDetails.module.scss';

const MyExperience = () => {
  const { tab } = useParams();

  const filterOptions = [
    { label: 'All Experiences', value: 'all' },
    { label: 'Not in Launchpad', value: 'notLaunch' },
    { label: 'Published', value: 'publish' },
    { label: 'Under Review', value: 'underReview' },
    { label: 'Draft', value: 'draft' },
    { label: 'Inactive', value: 'inactive' }
  ];

  //TO TOGGLE BETWEEN TABS ACCORDING TO CURRENT ACTIVE ROUTE 'TAB'
  const content = (tabs) => {
    switch (tabs) {
      case 'experiences':
        return <Experience filter={filterOptions} />;

      case 'assets':
        return <Assets />;

      default:
        return 'Comming Soon';
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div>
          <span className={styles.title}>
            {tab === 'experiences' ? 'My Experiences' : 'My Assets'}
          </span>
        </div>
      </div>
      <div className={styles.tab_head}>
        <div className={styles.tab_sections}>
          {experienceTabs.map((tabData) => (
            <Link
              to={`${tabData.redirect}/${tabData.currentTab}`}
              key={tabData.currentTab}
              className={`${styles.team_tab} ${tab === tabData.currentTab ? styles.active : ''}`}>
              {tabData.text}
            </Link>
          ))}
        </div>

        {tab === 'experiences' && (
          <div className="d-flex align-items-center">
            <Link to="/unity-editor" target="_blank">
              <div className={styles.add_btn}>
                <img src={PLUS} alt="add" />
                New Experience
              </div>
            </Link>
          </div>
        )}
        {tab === 'assets' && (
          <div className="d-flex align-items-center">
            <div className={styles.add_btn}>
              <img src={PLUS} alt="add" />
              New Asset
            </div>
          </div>
        )}
      </div>
      <div className="h-100">{content(tab)}</div>
      <div className={styles.add_btn_container}>
        {tab === 'experiences' && (
          <div className={styles.add_btn}>
            <img src={PLUS} alt="add" />
            New Experience
          </div>
        )}
        {tab === 'assets' && (
          <div className={styles.add_btn}>
            <img src={PLUS} alt="add" />
            New Asset
          </div>
        )}
      </div>
      <CreateNewTeam createTitle="Create New Experience" createBtnText="Create Experience" />
      <PublishExperience />
    </>
  );
};

export default MyExperience;
