import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GalleryProvider } from '../components/Gallery';
import { Home } from '../pages/Home';
import { Overview } from '../pages/Overview';
import { RoomDetail, Rooms } from '../pages/Rooms';
import { Dining } from '../pages/Dining';
import { Wellness } from '../pages/Wellness';
import { Bentota } from '../pages/Bentota';
import { Reviews } from '../pages/Reviews';
import { Facts } from '../pages/Facts';
import { PropertyLayout } from './PropertyLayout';

// HashRouter: every route is served by the one index.html, so the build works on any static host.
export function App() {
  return (
    <GalleryProvider>
      <HashRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path=":property" element={<PropertyLayout />}>
            <Route index element={<Overview />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="rooms/:roomId" element={<RoomDetail />} />
            <Route path="dining" element={<Dining />} />
            <Route path="wellness" element={<Wellness />} />
            <Route path="bentota" element={<Bentota />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="facts" element={<Facts />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </GalleryProvider>
  );
}
