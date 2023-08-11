import './App.css';
import { Route, Routes } from 'react-router-dom';
import RouterGuard from './pages/RouterGuard';
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <>
      <Helmet>
        <title>뭐해먹지?</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<RouterGuard />} />
        <Route path="/login" element={<RouterGuard />} />
        <Route path="/register" element={<RouterGuard />} />
        <Route path="/create" element={<RouterGuard />} />
        <Route path="/createAi" element={<RouterGuard />} />

        {/* <Route path="/myrecipes">
        <Route index element={<RouterGuard />} />
        <Route path=":postId" element={<RouterGuard />} />
      </Route> */}

        <Route path="/myrecipeUpdate" element={<RouterGuard />} />
        <Route path="/recipe" element={<RouterGuard />} />
        <Route path="/recipes" element={<RouterGuard />} />
        <Route path="/myrecipes" element={<RouterGuard />} />
        <Route path="/review" element={<RouterGuard />} />
        <Route path="/myaccount" element={<RouterGuard />} />
        <Route path="/leave" element={<RouterGuard />} />
        <Route path="/404" element={<RouterGuard />} />
      </Routes>
    </>
  );
}

export default App;
