// App.jsx
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import EditProfile from './Pages/EditProfile';
import Unlock from './Pages/Unlock';
import Projects from './Pages/Projects';
import Withdrawal from './Pages/Withdrawal';
import Login from './Pages/Login';
import CreateWithdrawal from './Pages/CreateWithdrawal';
import CreateUnlock from './Pages/CreateUnlock.jsx';
import CreateProject from './Pages/CreateProject.jsx';
import Stats from './Pages/Stats.jsx';
import Sidebar from './Components/Sidebar';
import ProtectedRoute from './ProtectedRoute';
import {AuthProvider} from './AuthContext'; // Импортируем провайдер
import {Provider} from 'react-redux'; // Импортируем Provider
import {Store} from './Store'; // Импортируем Redux-хранилище

const routeConfig = [
    {path: '/login', component: Login},
    {path: '/account', component: Withdrawal, protected: true},
    {path: '/create-withdrawal', component: CreateWithdrawal, protected: true},
    {path: '/create-unlock', component: CreateUnlock, protected: true},
    {path: '/projects', component: Projects, protected: true},
    {path: '/create-project', component: CreateProject, protected: true},
    {path: '/unlock', component: Unlock, protected: true},
    {path: '/stats', component: Stats, protected: true},
    {path: '/profile', component: EditProfile, protected: true},
];


export default function App() {
    return (
        <Provider store={Store}>
            <AuthProvider> {/* Оборачиваем приложение в AuthProvider */}
                <div className="grid relative surface-ground m-0 p-0">
                    <ProtectedRoute>
                        <div
                            className="col-fixed w-19rem col pr-0 mr-0 surface-section h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none">

                            <Sidebar/>
                        </div>
                    </ProtectedRoute>

                    <div className="col p-0 m-0 overflow-hidden">
                        <div>
                            <Routes>
                                {routeConfig.map(({path, component: Component, protected: isProtected}, index) => (
                                    <Route
                                        key={index}
                                        path={path}
                                        element={
                                            isProtected ? (
                                                <ProtectedRoute>
                                                    <Component/>
                                                </ProtectedRoute>
                                            ) : (
                                                <Component/>
                                            )
                                        }
                                    />
                                ))}
                            </Routes>
                        </div>
                    </div>
                </div>
            </AuthProvider>
        </Provider>
    );
}