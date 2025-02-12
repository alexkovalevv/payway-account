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
import Sidebar from './Components/Sidebar';
import ProtectedRoute from './ProtectedRoute';
import {AuthProvider} from './AuthContext'; // Импортируем провайдер
import {Provider} from 'react-redux'; // Импортируем Provider
import {Store} from './Store'; // Импортируем Redux-хранилище

export default function App() {
    return (
        <Provider store={Store}>
            <AuthProvider> {/* Оборачиваем приложение в AuthProvider */}
                <div className="min-h-screen flex relative surface-ground">
                    <ProtectedRoute>
                        <Sidebar/>
                    </ProtectedRoute>
                    <div className="min-h-screen flex flex-column relative flex-auto">
                        <div className="flex flex-column flex-auto">
                            <Routes>
                                <Route path="/login" element={<Login/>}/>

                                <Route
                                    path="/"
                                    element={
                                        <ProtectedRoute>
                                            <Withdrawal/>
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/create-withdrawal"
                                    element={
                                        <ProtectedRoute>
                                            <CreateWithdrawal/>
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/create-unlock"
                                    element={
                                        <ProtectedRoute>
                                            <CreateUnlock/>
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/projects"
                                    element={
                                        <ProtectedRoute>
                                            <Projects/>
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/create-project"
                                    element={
                                        <ProtectedRoute>
                                            <CreateProject/>
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/unlock"
                                    element={
                                        <ProtectedRoute>
                                            <Unlock/>
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <ProtectedRoute>
                                            <EditProfile/>
                                        </ProtectedRoute>
                                    }
                                />
                            </Routes>
                        </div>
                    </div>
                </div>
            </AuthProvider>
        </Provider>
    );
}