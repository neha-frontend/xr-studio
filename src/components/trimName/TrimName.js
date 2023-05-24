import { Fade, Tooltip } from '@material-ui/core';

const TrimName = (name) => {
  if (name?.length > 14) {
    return (
      <Tooltip
        title={name}
        placement="right"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        className="cp">
        <span>{`${name.slice(0, 14)}...`}</span>
      </Tooltip>
    );
  } else return name;
};

export default TrimName;
