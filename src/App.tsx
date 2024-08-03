import ContactPage from "./pages/contactPage/contactPage";
import useFetchData from "./shared/customHooks/getCustomHooks";
import CreateContactWidget from "./widgets/createContactWidget/createContactWidget";
import LandSection from "./sections/landSection";

function App() {


  // const url = 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contact/66aa7dce662ccba0abc4e2b2';
  // const token = 'VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn';

  const url = 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contacts?created=desk';
  const token = 'VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn'; 

  // const {data,isLoaded,error} = useFetchData(url,token)

  return (

    <>
      {/* <CreateContactWidget/> */}
      {/* <ContactPage/> */}
      {/* <button onClick={() => console.log(data)}>smt</button> */}
      <LandSection/>
    </>
  );
}

export default App; 