import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/user/register' element={<UserRegister />} />
                <Route path='/user/login' element={<h1>register221</h1>} />
                <Route path='/food-partner/register' element={<h1>register1wqr</h1>} />
                <Route path='/food-partner/login' element={<h1>register1wrqr</h1>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes