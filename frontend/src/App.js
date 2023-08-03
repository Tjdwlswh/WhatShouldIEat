import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import CreateRecipe from './pages/Create/CreateRecipe';
import MyRecipe from './pages/MyRecipe/MyRecipe';
import RecommendRecipe from './pages/RecommendRecipe';
import ReviewRecipe from './pages/ReviewRecipe';
import CreateAiReturn from './pages/Create/CreateAiReturn';
import AccountPage from './pages/AccountPage';
import LeavePage from './pages/LeavePage';
import MyRecipeList from './pages/MyRecipe/MyRecipeList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="create" element={<CreateRecipe />} />
      <Route path="/createAi" element={<CreateAiReturn />} />

      <Route path="/:email">
        <Route index element={<MyRecipeList />} />
        <Route path=":postId" element={<MyRecipe />} />
      </Route>

      {/* 임시 my레시피 주소 */}
      <Route path="/myrecipe" element={<MyRecipe />} />
      {/* ㅡㅡㅡㅡㅡㅡ */}

      <Route path="/recommend" element={<RecommendRecipe />} />
      <Route path="/review" element={<ReviewRecipe />} />
      <Route path="/myaccount" element={<AccountPage />} />
      <Route path="/leave" element={<LeavePage />} />
    </Routes>
  );
}

export default App;
