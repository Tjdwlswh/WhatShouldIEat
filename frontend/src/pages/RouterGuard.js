import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { getUser, setToken } from '../modules/user';

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import MainPage from './MainPage';
import CreateAiReturn from './Create/CreateAiReturn';
import CreateRecipe from './Create/CreateRecipe';
import MyRecipePage from './MyRecipe/MyRecipePage';
import MyRecipeListPage from './MyRecipe/MyRecipeListPage';
import MyRecipeUpdatePage from './MyRecipe/MyRecipeUpdatePage';
import RecommendRecipe from './RecommendRecipe';
import ReviewRecipe from './ReviewRecipe';
import AccountPage from './AccountPage';
import LeavePage from './LeavePage';

const RouterGuard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [userLoaded, setUserLoaded] = useState(false);
  const { pathname } = location;
  const { user } = useSelector(state => state.user);
  const { auth } = useSelector(state => state.auth);
  const accessToken = useSelector(state => state.user.token);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  /*********** 페이지 목록시작 ***********/

  const routes = [
    { path: '/', component: MainPage },
    { path: '/login', component: LoginPage, logoutRequired: true },
    { path: '/register', component: RegisterPage, logoutRequired: true },
    { path: '/create', component: CreateRecipe },
    { path: '/createAi', component: CreateAiReturn, loginRequired: true },
    { path: `/myrecipeUpdate`, component: MyRecipeUpdatePage, loginRequired: true },
    { path: `/${user?.email}`, component: MyRecipeListPage, loginRequired: true },
    { path: `/${user?.email}/`, component: MyRecipePage, loginRequired: true },
    // 임시 my레시피 주소
    { path: '/myrecipe', component: MyRecipeListPage, loginRequired: true },

    { path: '/recommend', component: RecommendRecipe, loginRequired: true },
    { path: '/review', component: ReviewRecipe, loginRequired: true },
    { path: '/myaccount', component: AccountPage, loginRequired: true },
    { path: '/leave', component: LeavePage, loginRequired: true },
    { path: '/404', component: MainPage },
  ];

  /********** 페이지 목록 끝 ***********/

  const uri = pathname.split(/\/(\d+)$/);
  let currentRoute = {};

  // 동적 주소 조회
  if (uri.length > 2) {
    currentRoute = routes.filter(route => route.path.startsWith(`${uri[0]}/`))[0];
  } else {
    currentRoute = routes.find(route => route.path === uri[0]);
  }

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('token');

    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch, auth]);

  useEffect(() => {
    dispatch(getUser(accessToken));
  }, [accessToken, dispatch, auth]);

  useLayoutEffect(() => {
    if (user) {
      setUserLoaded(true);
    }
  }, [user]);

  // 로그인된 상태면 정보를 가져오는 동안 대기
  if (!userLoaded && isLoggedIn) {
    return null;
  }

  // 등록된 라우트가 아닌 주소로 들어오면 404 페이지로 이동
  if (!currentRoute) {
    return <Navigate to="/404" />;
  }

  // 로그인이 필요한 페이지인 경우 로그인 상태를 확인하고 리디렉션
  if (currentRoute.loginRequired && !isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // 비로그인된 상태가 필요한 페이지인 경우 로그아웃 상태를 확인하고 리디렉션
  if (currentRoute.logoutRequired && user) {
    return <Navigate to="/" />;
  }

  const Component = currentRoute.component;
  return <Component />;
};

export default RouterGuard;
