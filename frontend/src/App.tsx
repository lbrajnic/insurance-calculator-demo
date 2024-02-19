import { Route, Routes } from "react-router-dom";
import HomeContainer from "./components/HomeContainer";
import InsurancesTable from "./components/insurances-table/InsurancesTable";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeContainer />} />
      <Route path="/insurances/:insuranceId" element={<HomeContainer />} />
      <Route path="/table" element={<InsurancesTable />} />
    </Routes>
  );
}

export default App;
