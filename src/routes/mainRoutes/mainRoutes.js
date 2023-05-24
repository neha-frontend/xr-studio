import { lazy } from 'react';

export const guestRoutes = [
  {
    path: '/',
    name: 'Welcome',
    exact: true,
    component: lazy(() => import('../../views/welcomePage/Welcome'))
  },
  {
    path: '/create-account',
    name: 'SignUp',
    exact: true,
    component: lazy(() => import('../../views/createAccount/CreateAccount'))
  },
  {
    path: '/sign-up',
    name: 'SignUp-Details',
    exact: true,
    component: lazy(() => import('../../views/createAccount/SignUp'))
  },
  {
    path: '/login',
    name: 'Login',
    exact: true,
    component: lazy(() => import('../../views/login/Login'))
  }, 
  {
    redirectRoute: true,
    name: 'Welcome',
    path: '/login'    
  }
];

export const userRoutes = [
  {
    path: '/my-team',
    name: 'MyTeam',
    exact: true,
    component: lazy(() => import('../../views/myTeam/MyTeam'))
  },
  {
    path: '/my-team/?:_branch_match_id&:_branch_referrer',
    name: 'MyTeam',
    exact: true,
    component: lazy(() => import('../../views/myTeam/MyTeam'))
  },
  {
    path: '/create-username',
    name: 'CreateUsername',
    exact: true,
    component: lazy(() => import('../../views/createAccount/CreateUserName'))
  },
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: lazy(() => import('../../views/homePage/HomePage'))
  },
  {
    path: '/team-details/:tab',
    name: 'Team',
    exact: true,
    component: lazy(() => import('../../views/teamDetails/TeamDetails'))
  },
  {
    path: '/my-experience/:tab',
    name: 'MyExperience',
    exact: true,
    component: lazy(() => import('../../views/myExperiences/MyExperiences'))
  },
  {
    path: '/my-team/manage-experience',
    name: 'Manage Experience',
    exact: true,
    component: lazy(() => import('../../views/manageExperinece/ManageExperience'))
  },
  {
    path: '/message',
    name: 'Message',
    exact: true,
    component: lazy(() => import('../../views/chat/messageList/MessageList'))
  },
  {
    path: '/message/:tab',
    name: 'Message-Inbox',
    exact: true,
    component: lazy(() => import('../../views/chat/inboxMessage/inboxMessage'))
  },
  {
    path: '/launchpad',
    name: 'Launchpad',
    exact: true,
    component: lazy(() => import('../../views/launchpad/Launchpad'))
  },
  {
    path: '/unity-editor',
    name: 'Editor',
    exact: true,
    component: lazy(() => import('../../views/unityEditor/UnityEditor'))
  },
  {
    redirectRoute: true,
    name: 'Home',
    path: '/'   
  }
];
