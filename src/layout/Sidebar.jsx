import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  makeStyles,
  ListItemIcon,
  useMediaQuery
} from '@material-ui/core';

import { SidebarData } from './SidebarMenu';
import {
  BACK_ARROW,
  BELL,
  DOWN_ARROW,
  FAVOURITE_TEAM,
  LOGO,
  MENU_ICON,
  PROFILE,
  SEARCH,
  STAR,
  YELLOW_START
} from '../assets/images';
import TeamsMember from '../views/teamDetails/teamsMemberIcon/TeamsMember';
import useFavourite from '../hooks/manageFavourite/manageFavourite';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
      zIndex: 10
    }
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 10,
    left: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: '240px',
    height: '100%',
    paddingTop: 0,
    [theme.breakpoints.down('sm')]: {
      marginTop: '56px',
      marginLeft: '0px'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
    alignItems: 'flex-start',
    position: 'absolute',
    left: '24px'
  }
}));

export default function Sidebar({ data }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { tab } = useParams();
  const isDesktop = useMediaQuery('(min-width:960px)');
  const [open, setOpen] = useState(isDesktop);
  const [activeIndex, setActiveIndex] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const { favouriteTeam, favouriteLoader } = useSelector((state) => state.profile.updateProfile);
  const { teamDetail, userRole } = useSelector((state) => state.myTeam.teamDetail);
  const { isLoading, allTeamList } = useSelector((state) => state.myTeam.myTeam);

  const showInvite = userRole === 'admin' || userRole === 'owner';
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  //SET ACTIVE AND REDIRECT TO COORESPONDING SIDEBAR PAGE
  const handleListItem = (index, redirect) => {
    handleDrawerToggle();
    setActiveIndex(index);
    navigate(redirect);
  };

  const currentUrl = window.location.href;

  const handleTeamDetail = (org, teamId) => {
    localStorage.setItem('orgId', org);
    localStorage.setItem('teamId', teamId);
    navigate('/team-details/experiences');
  };

  const favouriteTeams = () => {
    return (
      <>
        {favouriteTeam?.length ? (
          favouriteTeam?.map((text) => (
            <ListItem
              button
              key={text?.team?.name}
              onClick={() => handleTeamDetail(text?._organization, text?._team)}>
              <ListItemIcon>
                <img src={FAVOURITE_TEAM} alt="team_icon" />
              </ListItemIcon>
              <ListItemText primary={text?.team?.name} />
            </ListItem>
          ))
        ) : !favouriteLoader && !favouriteTeam?.length ? (
          <div className="no_data">No Favourite Yet</div>
        ) : null}
      </>
    );
  };

  const drawerContent = (
    <div>
      <List>
        <Link to="/">
          <img src={LOGO} alt="logo" className="user_logo_img" />
        </Link>
        <div className="sidebar_profile">
          <img src={PROFILE} alt="profile" />
          <div>
            <p className="name">John Doe</p>
            <Link to="/">View profile</Link>
          </div>
        </div>
        {SidebarData.map((text, index) => (
          <ListItem
            button
            key={text.title}
            className={index === activeIndex ? 'active_list' : null}
            onClick={() => handleListItem(index, text.redirect)}>
            <ListItemIcon>
              <img src={text.icon} alt={text.alt} />
            </ListItemIcon>
            <ListItemText primary={text.title} />
          </ListItem>
        ))}
        <div className="favourite">Favorite Teams</div>
        {favouriteTeams()}
      </List>
    </div>
  );

  const updateLike = (value) => {
    setIsLiked(value);
  };

  const [handleFavourite] = useFavourite(
    teamDetail?._organization,
    teamDetail?._id,
    updateLike,
    isLiked
  );

  useEffect(() => {
    setIsLiked(teamDetail?.isFavorite);
  }, [teamDetail]);

  useEffect(() => {
    SidebarData.forEach((item) => {
      item.activeTabs.forEach((tab) => {
        if (currentUrl.includes(tab)) setActiveIndex(item.id);
      });
    });
    favouriteTeams();
  }, [favouriteTeam]);

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Drawer
          variant={window.innerWidth < 960 ? 'temporary' : 'permanent'}
          open={open}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}>
          {drawerContent}
        </Drawer>
      </nav>
      <div className="menuIconContainer">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}>
          <img src={MENU_ICON} alt="menu" />
        </IconButton>
        {!isLoading && allTeamList?.list?.length > 0 && currentUrl?.includes('/team-details') && (
          <div className="teamDetails_header">
            <span className="title">{teamDetail?.name}</span>
            <img
              src={isLiked ? YELLOW_START : STAR}
              className="star"
              alt="favourite"
              onClick={handleFavourite}
            />
          </div>
        )}
        {currentUrl?.includes('/my-team') && (
          <div className="teamDetails_header">
            <span className="title">My Teams</span>
          </div>
        )}
      </div>
      <main className={classes.content}>
        <div className="user_header">
          <div className="w-m-100">
            {currentUrl.includes('team-details') && (
              <div className="d-flex align-items-center justify-content-between py-3">
                <div className="d-flex align-items-center cp" onClick={() => navigate('/my-team')}>
                  <img src={BACK_ARROW} alt="back" className="back_arrow" />
                  <span>My Teams</span>
                </div>
                {(tab === 'experiences' || tab === 'assets') && (
                  <TeamsMember
                    teamsImgContainerClass="headerTeam"
                    addContainerClass="headerAddContainer"
                    showInvite={showInvite}
                  />
                )}
              </div>
            )}
          </div>
          <div className="user_header_icons">
            <img src={SEARCH} alt="search" className="header_icon" />
            <img src={BELL} alt="notification" className="header_icon" />
            <img src={PROFILE} alt="profile" className="profile_pic" />
            <img src={DOWN_ARROW} alt="dropDown" />
          </div>
        </div>
        <div className="child_body">{data}</div>
      </main>
    </div>
  );
}
