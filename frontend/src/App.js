import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import CreateRecipe from './pages/CreateRecipe';
import MyRecipe from './pages/MyRecipe';
import RecommendRecipe from './pages/RecommendRecipe';
import ReviewRecipe from './pages/ReviewRecipe';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/create" element={<CreateRecipe />} />
      <Route path="/myrecipe" element={<MyRecipe />} />
      <Route path="/recommend" element={<RecommendRecipe />} />
      <Route path="/review" element={<ReviewRecipe />} />
      <Route path="/myaccount" element={<ReviewRecipe />} />
    </Routes>
  );
}

export default App;
