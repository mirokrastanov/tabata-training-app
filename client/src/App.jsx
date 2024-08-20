import './App.css';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import Workouts from './components/workouts/Workouts';
import SignUp from './components/signup/SignUp';
import Titlebar from './components/titlebar/Titlebar';
import AddBtn from './components/shared/addBtn/AddBtn';
import NotFound from './components/notFound/NotFound';
import SignIn from './components/signin/SignIn';
import Settings from './components/settings/Settings';
import UserRoutes from './routeGuards/UserRoutes';
import GuestRoutes from './routeGuards/GuestRoutes';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import CreateWorkout from './components/createWorkout/CreateWorkout';
import EditWorkout from './components/editWorkout/EditWorkout';
import ViewWorkout from './components/viewWorkout/ViewWorkout';

function App() {

    return (
        <>
            <Toaster />

            <div id="app__wrapper" className="bg-purple-900 text-white w-full h-[calc(100vh-4rem)] flex flex-nowrap flex-col justify-start items-stretch rounded-xl relative">
                <Titlebar />

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="home" element={<Navigate to="/" />} />
                    <Route path="index" element={<Navigate to="/" />} />
                    <Route path="settings" element={<Settings />} />

                    {/* <Route element={<UserRoutes />}> */}
                        <Route path="workouts" element={<Workouts />} />
                        <Route path="workouts/create" element={<CreateWorkout />} />
                        <Route path="workouts/edit/:id" element={<EditWorkout />} />
                        <Route path="workouts/details/:id" element={<ViewWorkout />} />

                        <Route path="user/profile" element={<Profile />} />
                        {/* TODO: Implement Logout and import it from Auth Context */}
                    {/* </Route> */}

                    <Route element={<GuestRoutes />}>
                        <Route path="user/signup" element={<SignUp />} />
                        <Route path="user/signin" element={<SignIn />} />
                    </Route>


                    {/* TODO */}
                    {/* Create Workout */}
                    {/* For the create workout add a btn to select from preset workouts & add them to param lib */}
                    {/* Edit Workout */}
                    {/* View Workout */}
                    {/* Workout in progress | Action View | Timers | Main */}



                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    )
}

export default App;
