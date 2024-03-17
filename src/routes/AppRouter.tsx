import { BrowserRouter, Routes, Route } from "react-router-dom";
import Location from "../pages/location/Location";
import AllCharacters from "../pages/all characters/AllCharacters";
import CharacterDetail from "../pages/character detail/CharacterDetail";
import Favourites from "../pages/favourites/Favourites";
import Navbar from "../components/navbar/Navbar";
const AppRouter = () => {
  return (
    <BrowserRouter>
          <Navbar/>
      <Routes>
        <Route path="/" element={<Location />} />
        <Route path="/location/:id/characters" element={<AllCharacters />} />
        <Route path="/location/:id/characters/:characterId" element={<CharacterDetail />} />
        <Route path="/favourites" element={<Favourites/>}/>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
