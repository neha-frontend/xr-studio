import React, { useState } from 'react';

import PublishExperience from '../../components/modal/publishExperience/PublishExperience';

const ManageExperience = () => {
  const [isDraft, setIsDraft] = useState(true);

  return (
    <>
      <PublishExperience draft={isDraft} setDraft={setIsDraft} />
    </>
  );
};

export default ManageExperience;
