import React from 'react';

import TagCreators from './TagCreators';

import styles from './formcontainer.module.scss';

const FormContainer = ({ data, image }) => {
  return (
    <main className={styles.main_wrapper}>
      <div className={styles.name_input}>
        <h3 className={styles.input_label}>Experience Name</h3>
        <span>{data.exp_name}</span>
        <span className={styles.review_span}>In Review</span>
      </div>
      <div className={styles.name_input}>
        <h3 className={styles.input_label}>Experience Thumbnail</h3>
        <div className={styles.image_circle}>
          <img src={image} alt="profile_image" className={styles.image_preview} />
        </div>
      </div>
      <div className={styles.name_input}>
        <h3 className={styles.input_label}>Experience Description</h3>
        <p className="w-100">{data.description}</p>
      </div>
      <div className={styles.name_input}>
        <h3 className={styles.input_label}>Tag Creators</h3>
        <TagCreators tagData={data.tag_creators} />
      </div>

      <div className={styles.name_input}>
        <h3 className={styles.input_label}>Location</h3>
        {data &&
          data.location_tag.map((item) => (
            <span className={styles.exp_tagtext} key={item.value}>
              {item.value}
            </span>
          ))}
      </div>

      <div className={styles.name_input}>
        <h3 className={styles.input_label}>Experience Tags</h3>
        {data &&
          data.experience_tags.map((item) => (
            <span className={styles.exp_tagtext} key={item.value}>
              {item.value}
            </span>
          ))}
      </div>
    </main>
  );
};

export default FormContainer;
