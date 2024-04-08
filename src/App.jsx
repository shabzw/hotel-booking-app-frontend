import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./pages/Layout";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";

// axios.defaults.baseURL = "http://127.0.0.1:4000"
// axios.defaults.withCredentials = true;

function App() {

  return (
    <>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Layout/>}>
            <Route index element={<IndexPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            {/* <Route exact path="/profile" element={<Profile />} /> */}
            <Route exact path="/" element={<IndexPage />} />
            <Route exact path="/account" element={<ProfilePage/>}/>
            <Route exact path="/account/places" element={<PlacesPage/>}/>
            <Route exact path="/account/places/:id" element={<PlacesFormPage/>}/>
            <Route exact path="/account/places/new" element={<PlacesFormPage/>}/>
            <Route exact path="/place/:id" element={<PlacePage/>}/>
            <Route exact path="/account/bookings" element={<BookingsPage/>}/>
            <Route exact path="/account/bookings/:id" element={<BookingPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </UserContextProvider>

    </>
  );
}

export default App;
