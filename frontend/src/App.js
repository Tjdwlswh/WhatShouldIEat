import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import CreateRecipe from './pages/Create/CreateRecipe';
import MyRecipe from './pages/MyRecipe';
import RecommendRecipe from './pages/RecommendRecipe';
import ReviewRecipe from './pages/ReviewRecipe';
import CreateAiReturn from './pages/Create/CreateAiReturn';
import AccountPage from './pages/AccountPage';
import LeavePage from './pages/LeavePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/:email">
        <Route index element={<CreateRecipe />} />
        <Route path=":postId" element={<CreateAiReturn />} />
      </Route>
      <Route path="/CreateAi" element={<CreateAiReturn />} />

      <Route path="/myrecipe" element={<MyRecipe />} />
      <Route path="/recommend" element={<RecommendRecipe />} />
      <Route path="/review" element={<ReviewRecipe />} />
      <Route path="/myaccount" element={<AccountPage />} />
      <Route path="/leave" element={<LeavePage />} />
    </Routes>
  );
}

export default App;
