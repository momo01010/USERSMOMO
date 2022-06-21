import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import CardUser from './components/CardUser'
import UserForm from './components/UserForm'
import './App.css'
import { FaGithub } from 'react-icons/fa'

const URL = 'https://users-crud1.herokuapp.com/users/'

function App() {

 
  const [users, setUsers] = useState()
  
  const [showForm, setShowForm] = useState(false)
  
  const [objectUpdate, setObjectUpdate] = useState()

  const{register, handleSubmit, reset} = useForm()


  const getAllUsers = ()=>{
    axios.get(URL)
    .then((res)=>{
      setUsers(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  useEffect(()=>{
    getAllUsers()
  }, [])

  const createNewUser = (data)=>{
    axios.post(URL, data)
    .then((res)=>{
      console.log(res.data)
      getAllUsers()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const updateUser = (id, data)=>{

    axios.patch(`${URL}${id}/`, data)
    .then((res)=>{
      console.log(res.data)
      getAllUsers()
      setObjectUpdate()
      setShowForm(false)
    })
    .catch((err)=>{
      console.log(err)
    })

  }

  const showFormFunc = ()=>{
    const obj = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      birthday: ''
    }
    reset(obj)
    setShowForm(!showForm)
  }


  let userList = users?.map(user => (
  <CardUser 
  user={user} 
  key={user.id} 
  URL={URL}
  getAllUsers={getAllUsers}
  setShowForm={setShowForm}
  setObjectUpdate={setObjectUpdate}
  reset={reset}
  />)
  )

  return (
    <div className="App">
      <header className='header'>
        
         <h1 className='title'>USERS</h1>

      </header>
      <main>

       <button className='btn-create-new' onClick={showFormFunc}>{showForm ? '^-^': 'New User'}</button>

       
       {
        showForm &&
        <UserForm
        createNewUser={createNewUser}
        objectUpdate={objectUpdate}
        updateUser={updateUser}
        handleSubmit={handleSubmit}
        reset={reset}
        register={register}
        />
       }

       <div className='user-card-container'>
       {userList}
       </div>

      </main>
      <footer>
        <a href="https://github.com/momo01010"><FaGithub className='github-icon'/></a>
      </footer>
    </div>
  )
}

export default App
