import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { getUser, setToken } from '../modules/user';

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import MainPage from './MainPage';
import CreateRecipe from './Create/CreateRecipe';
import MyRecipe from './MyRecipe/MyRecipe';
import RecommendRecipe from './RecommendRecipe';
import ReviewRecipe from './ReviewRecipe';
import CreateAiReturn from './Create/CreateAiReturn';
import AccountPage from './AccountPage';
import LeavePage from './LeavePage';
import MyRecipeList from './MyRecipe/MyRecipeList';

const routes = [
  { path: '/', component: MainPage },
  { path: '/login', component: LoginPage, logoutRequired: true },
  { path: '/register', component: RegisterPage, logoutRequired: true },
  { path: '/create', component: CreateRecipe },
  { path: '/createAi', component: CreateAiReturn, loginRequired: true },
  { path: '/myrecipe', component: MyRecipe, loginRequired: true },
  { path: '/recommend', component: RecommendRecipe, loginRequired: true },
  { path: '/review', component: ReviewRecipe, loginRequired: true },
  { path: '/myaccount', component: AccountPage, loginRequired: true },
  { path: '/leave', component: LeavePage, loginRequired: true },
  { path: '/myrecipelist', component: MyRecipeList, loginRequired: true },
  { path: '/myrecipelist/:postId', component: MyRecipe, loginRequired: true },
];

const RouterGuard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const token = cookies.get('token');
  const { pathname } = location;
  const { user } = useSelector(state => state.user);
  const accessToken = useSelector(state => state.user.token);

  const uri = pathname.split(/\/(\d+)$/);
  let currentRoute = {};

  if (uri.length > 2) {
    currentRoute = routes.filter(route => route.path.startsWith(`${uri[0]}/`));
  } else {
    currentRoute = routes.find(route => route.path === uri[0]);
  }

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(getUser(accessToken));
  }, [accessToken, dispatch]);

  // 등록된 라우트가 아닌 주소로 들어오면 404 페이지로 이동
  if (!currentRoute) {
    return <Navigate to="/404" />;
  }

  // 로그인이 필요한 페이지인 경우 로그인 상태를 확인하고 리디렉션
  if (currentRoute.loginRequired && !user) {
    return <Navigate to="/login" />;
  }

  // 비로그인된 상태가 필요한 페이지인 경우 로그아웃 상태를 확인하고 리디렉션
  if (currentRoute.logoutRequired && user) {
    console.log('?');
    return <Navigate to="/" />;
  }

  const Component = currentRoute.component;
  return <Component />;
};

export default RouterGuard;
