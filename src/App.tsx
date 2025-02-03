import React from "react";
import { Outlet } from "react-router";
import { Admin, CustomRoutes, fetchUtils, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./User/UserList";
import { UserCreate } from "./User/UserCreate";
import { UserUpdate } from "./User/UserUpdate";
import { VendorList } from "./Vendor/VendorList";
import { VendorCreate } from "./Vendor/VendorCreate";
import { VendorUpdate } from "./Vendor/VendorUpdate";
import { PackageCreate } from "./Package/PackageCreate";
import { PackageList } from "./Package/PackageList";
import { PackageUpdate } from "./Package/PackageUpdate";
import MyLayout from "./MyLayout";
import theme from "./Theme";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./components/footer/Footer";
import DynamicHeader from "./components/header/DynamicHeader";
import AboutUs from "./pages/about/AboutUs";
import Blogs from "./pages/blogs/Blogs";
import Contact from "./pages/contact/Contact";
import LoginPage from "./pages/login/LoginPage";
import PackageDetailsWrapper from "./pages/packages/PackageDetailsWrapper";
import PackagesList from "./pages/packages/PackagesList";
import Registration from "./pages/registration/Registration";
import Home from "./pages/home/Home";
import Destination from "./pages/destinations/Destination";
import BookingsHistory from "./pages/dropDown/BookingsHistory";
import PackageCart from "./pages/dropDown/PackageCart";
import Profile from "./pages/dropDown/Profile";
const apiUrl = import.meta.env.VITE_API_URL;
const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const { data } = JSON.parse(localStorage?.getItem('auth') as string);
  options.headers.set('Authorization', `Bearer ${data.accessToken}`);
  return fetchUtils.fetchJson(url, options);
};
const dataProvider = jsonServerProvider(apiUrl,httpClient);
//authProvider={authProvider}
const AdminRoute: React.FC = () => (
  <Admin dataProvider={dataProvider} layout={MyLayout} theme={theme}>
    <Resource
      name="user"
      list={UserList}
      create={UserCreate}
      edit={UserUpdate}
    />
    <Resource
      name="vendor"
      list={VendorList}
      create={VendorCreate}
      edit={VendorUpdate}
    />
    <Resource
      name="package"
      list={PackageList}
      create={PackageCreate}
      edit={PackageUpdate}
    />
  </Admin>
);

const OpenRoute: React.FC = () => (
  <Admin
    basename="/open"
    dataProvider={dataProvider}
  >
    <CustomRoutes noLayout>
    <Route
          path="/vendorRegistration"
          element={
              <VendorResistration />
          }
        />
    </CustomRoutes>
  </Admin>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="destinations" element={<Destination />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="registration" element={<Registration />} />
          <Route path="loginpage" element={<LoginPage />} />
          <Route path="bookingshistory" element={<BookingsHistory/>}/>
          <Route path="packagecart" element={<PackageCart/>}/>
          <Route path="profile" element={<Profile/>}/>
          
          <Route
            path="packages"
            element={
              <PackagesList
                heading={""}
                subheading={""}
                packages={[]}
                onDetailsBookNowClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
                onExploreMoreClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
          <Route path="packages/:id" element={<PackageDetailsWrapper />} />
          <Route index element={<Home />} />
        </Route>
        <Route path="admin/*" element={<AdminRoute />} />
        <Route path="/open/*" element={<OpenRoute />} />
      </Routes>
    </Router>
  );
}

const Layout: React.FC = () => {
  return (
    <>
      <DynamicHeader />
      <main><Outlet /></main>
      <Footer />
    </>
  );
};


export default App;
