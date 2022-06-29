import { useState, useContext, useEffect } from 'react';
import  {Routes, Route, Navigate} from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import Costumers from '../pages/Costumers'
import New from '../pages/New';
import { AuthContext } from '../contexts/auth';


 export default function MyRoutes(){
   const { user} = useContext(AuthContext);

    return(
       <Routes>
          <Route exact path='/' element={<SignIn/>}/>
          <Route exact path='/register' element={<SignUp/>}/>
          <Route isPrivate exact path='/dashboard' element={<ProtectedRoute user={user}><Dashboard/></ProtectedRoute> }/>
          <Route isPrivate exact path='/profile' element={<ProtectedRoute user={user}><Profile/></ProtectedRoute>}/>
          <Route isPrivate exact path='/costumers' element={<ProtectedRoute user={user}><Costumers/></ProtectedRoute>}/>
          <Route isPrivate exact path='/new' element={<ProtectedRoute user={user}><New/></ProtectedRoute>}/>
          <Route isPrivate exact path='/new/:id' element={<ProtectedRoute user={user}><New/></ProtectedRoute>}/>
       </Routes> 
    );
}

const ProtectedRoute = ({ user, children }) => {
   if (!user) {
     return <Navigate to="/" replace />;
   }
 
   return children;
 };