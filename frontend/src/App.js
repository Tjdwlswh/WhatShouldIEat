import './App.css';
import { Route, Routes } from 'react-router-dom';
import RouterGuard from './pages/RouterGuard';
import MyRecipeList from './pages/MyRecipe/MyRecipeList';
import MyRecipe from './pages/MyRecipe/MyRecipe';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RouterGuard />} />
      <Route path="/login" element={<RouterGuard />} />
      <Route path="/register" element={<RouterGuard />} />
      <Route path="/create" element={<RouterGuard />} />
      <Route path="/createAi" element={<RouterGuard />} />

      <Route path="/myrecipelist">
        <Route index element={<RouterGuard />} />
        <Route path=":postId" element={<RouterGuard />} />
      </Route>

      {/* 임시 my레시피 주소 */}
      <Route path="/myrecipe" element={<RouterGuard />} />
      {/* ㅡㅡㅡㅡㅡㅡ */}

      <Route path="/recommend" element={<RouterGuard />} />
      <Route path="/review" element={<RouterGuard />} />
      <Route path="/myaccount" element={<RouterGuard />} />
      <Route path="/leave" element={<RouterGuard />} />
    </Routes>
  );
}

export default App;
