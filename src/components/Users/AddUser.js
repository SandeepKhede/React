import React,{useState} from 'react'
import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css'
const AddUser = (props) => {
    const [enteredUsername,SetEnteredUsername] = useState('');
    const [enteredAge,SetEnteredAge] = useState('');
    const [error, setError] = useState()
    const addUserHandler = (event) =>{
        event.preventDefault();
        if(enteredAge.trim().length === 0 || enteredUsername.trim().length === 0){
            
            setError({
                title:'Invalid input',
                message:'Please enter a valid name and age (non-empty values)'
            })
            return;
        }
        // +enteredAge convert string into number
        if(+enteredAge < 1){
            setError({
                title:'Invalid age',
                message:'Please enter a valid age (> 0)'
            })
            return;
        }
        props.onAddUser(enteredUsername,enteredAge);
        SetEnteredAge('');
        SetEnteredUsername('');
    }
    const usernameChangeHandler = (event) =>{
        SetEnteredUsername(event.target.value);

    }
    const userageChangeHandler = (event) =>{
        SetEnteredAge(event.target.value);
    }

    const errorHandler = () =>{
        setError(null);
    }
    
  return (
    <div>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
            <Card className={classes.input} >    
                <form onSubmit={addUserHandler}>
                    <label htmlFor='username'>Username</label>
                    <input id="username" type='text' value={enteredUsername} onChange={usernameChangeHandler} />
                    <label htmlFor='age'>Age (Years)</label>
                    <input id="age" type='number' value={enteredAge} onChange={userageChangeHandler} />
                    <Button type='submit'>Add User</Button>

                </form>
            </Card>
    </div>
  )
}

export default AddUser