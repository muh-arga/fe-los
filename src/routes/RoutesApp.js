import React from 'react';
import { BrowserRouter as Router, Route,  Routes} from 'react-router-dom';

import Login from '../views/auth/Login';
import Dashboard from '../views/Dashboard';
import AddPatient from '../views/AddPatient';
import PredictLos from '../views/PredictLos';
import PredictResult from '../views/PredictResult';
import History from '../views/History';
import DetailLos from '../views/DetailLos';

const RoutesApp = () => {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/predict" element={<PredictLos />} />
            <Route path="/predict-result" element={<PredictResult />} />
            <Route path="/history" element={<History />} />
            <Route path="/detail-los" element={<DetailLos />} />
        </Routes>
        </Router>
    );
}

export default RoutesApp;