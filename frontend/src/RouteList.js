import {Routes, Route, Navigate} from 'react-router-dom';
import Homepage from './Homepage';
import GameStartForm from './GameStartForm';
import Game from './Game';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import ProfileForm from './ProfileForm';
import FindUser from './FindUser.js';
import UserList from './UserList.js';

const RouteList = function({currUser, login, signup}){

    if(!currUser){
        return(
            <Routes>
                <Route 
                    path='/'
                    element={<Homepage/>}
                />
                <Route
                    path='/login'
                    element={<LoginForm login={login}/>}
                />
                <Route
                    path='/signup'
                    element={<SignupForm signup={signup}/>}
                />
                <Route
                    path='/*'
                    element={<Navigate to='/'/>}
                />
            </Routes>
        )
    }

    console.log(`User ${currUser.username} signed in`);
    return(
        <Routes>
            <Route
                path='/'
                element={<Homepage/>}
            />
            <Route
                path='/profile/:username'
                element={<FindUser/>}
            />
            <Route
                path='/profile/edit'
                element={<ProfileForm/>}
            />
            <Route
                path='/play'
                element={<GameStartForm/>}
            />
            <Route
                path='/play/:amount/:category/:type'
                element={<Game/>}
            />
            <Route
                path='/users'
                element={<UserList/>}
            />
            <Route
                path='/signout'
                element={<Homepage/>}
            />
            <Route
                path='/*'
                element={<Navigate to='/'/>}
            />
        </Routes>
    )
}

export default RouteList;