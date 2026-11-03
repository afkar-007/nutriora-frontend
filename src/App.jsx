import { useState } from 'react'
import Login from './Pages/Login'
import { Route,Routes } from 'react-router-dom'
import Landing from './Pages/Landing'
import Register from './Pages/Register'
import PersonalDetails from './Pages/PersonalDetails'
import BodyMeasurements from './Pages/BodyMeasurements'
import NutritionGoals from './Pages/NutritionGoals'
import FoodHabits from './Pages/FoodHabits'
import Lifestyle from './Pages/Lifestyle'
import ClientHome from './Pages/ClientHome'
import Profile from './Pages/Profile'

import Nutrition from './Pages/Nutrition'

import Workout from './Pages/Workout'
import ClientAbout from './Pages/ClientAbout'


import ClientPersonalDetails from './Pages/ClientPersonalDetails'
import ClientBodyMeasurements from './Pages/ClientBodyMeasurement'
import ClientNutritionGoals from './Pages/ClientNutritionGoals'
import ClientFoodHabits from './Pages/ClientFoodHabits'
import ClientLifestyle from './Pages/ClientLifeStyle'

import AdminDashboard from './Admin/AdminDashboard'
import MyClients from './Admin/MyClients'
import DietPlans from './Admin/DietPlans'
import CreateDietPlan from './Admin/CreateDietPlans'
import NutritionistProfile from './Admin/NutrionistProfile'
import Secret from './Admin/Secret'
import Personal from './Admin/Personal'
import NutAbout from './Admin/NutAbout'
import Surprise from './Admin/Surprise'



import ClientProfilePage from './Admin/ClientProfilePage'
import ClientPersonalDetailsPage from './Admin/ClientPersonalDetailsPage'
import ClientBodyMeasurementPage from './Admin/ClientBodyMeasurementPage'
import ClientFoodHabitsPage from './Admin/ClientFoodHabitsPage'
import ClientNutritionGoalsPage from './Admin/ClientNutritionGoalsPage'
import ClientLifestylePage from './Admin/ClientLifeStylePage'

import ClientDietPlanPage from './Admin/ClientDietPlanPage'

import HealthCreate from './Admin/HealthCreate'
import HealthUsers from './Admin/HealthUsers'
import HealthCardPage from './Admin/HealthCardPage'
import HealthCardDetails from './Admin/HealthCardDetailsPage'

import ScrollToTop from './Components/ScrollToTop'






function App() {


  return (
    <>
    <ScrollToTop/>
    <Routes>

      <Route path='/' element={<Landing/>}/>

      <Route path='/Login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/PersonalDetails' element={<PersonalDetails/>}/>
      <Route path='/BodyMeasurements' element={<BodyMeasurements/>}/>
      <Route path='/NutritionGoals' element={<NutritionGoals/>}/>
      <Route path='/FoodHabits' element={<FoodHabits/>}/>
      <Route path='/Lifestyle' element={<Lifestyle/>}/>
      <Route path='/clientHome' element={<ClientHome/>}/>
      <Route path='/client/profile' element={<Profile/>}/>
      <Route path='/client/personal-details' element={<ClientPersonalDetails/>}/>
      <Route path='/client/body-measurements' element={<ClientBodyMeasurements/>}/>
      <Route path='/client/nutrition-goals' element={<ClientNutritionGoals/>}/>
      <Route path='/client/food-habits' element={<ClientFoodHabits/>}/>
      <Route path='/client/lifestyle' element={<ClientLifestyle/>}/>

      <Route path='/workout' element={<Workout/>}/>
      <Route path='/clientAbout' element={<ClientAbout/>}/>

      <Route path='/nutritionist' element={<AdminDashboard/>}/>
      <Route path='/nutritionist/clients' element={<MyClients/>}/>
      <Route path='/nutritionist/diet-plans' element={<DietPlans/>}/>
      <Route path='/nutritionist/diet-plans/create' element={<CreateDietPlan/>}/>
      <Route path='/client/nutrition' element={<Nutrition/>}/>
      <Route path='/NutritionistProfile' element={<NutritionistProfile/>}/>
      <Route path='/secret' element={<Secret/>}/>
      <Route path='/personal' element={<Personal/>}/>
      <Route path='/Nutritionist/about' element={<NutAbout/>}/>
      <Route path='/Surprise' element={<Surprise/>}/>


      <Route path='nutritionist/clients/:id' element={<ClientProfilePage/>}/>
      <Route path='nutritionist/clients/:id/personalDetails' element={<ClientPersonalDetailsPage/>}/>
      <Route path='nutritionist/clients/:id/body-measurements' element={<ClientBodyMeasurementPage/>}/>
      <Route path='nutritionist/client/:id/food-habits' element={<ClientFoodHabitsPage/>}/>
      <Route path='nutritionist/client/:id/nutrition-goals' element={<ClientNutritionGoalsPage/>}/>
      <Route path='nutritionist/client/:id/lifestyle' element={<ClientLifestylePage/>}/>
      <Route path='nutritionist/diet-plans/:id' element={<ClientDietPlanPage/>}/>

      <Route path='nutritionist/healthUsers' element={<HealthUsers/>}/>
      <Route path='nutritionist/healthCreate/:id' element={<HealthCreate/>}/>
      <Route path='healthCard' element={<HealthCardPage/>}/>
      <Route path='healthCardDetails/:id' element={<HealthCardDetails/>}/>
    </Routes>


      
    </>
  )
}

export default App
