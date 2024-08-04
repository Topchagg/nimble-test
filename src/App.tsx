import { ContactPage } from "./pages/pageApi";
import { LandSection } from "./sections/sectionApi";

import { Route,Routes } from "react-router-dom";

function App() {

  return (

    <>
      <Routes>
        <Route index element={<LandSection/>}/>
        <Route path="contact/:id" element={<ContactPage/>}/>
      </Routes>
    </>
  );
}

export default App; 