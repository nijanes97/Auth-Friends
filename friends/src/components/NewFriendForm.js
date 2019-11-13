import React from 'react'
import axios from "axios";

const axioWithAuth = () => {
    return axios.create({
      headers: {
        authorization: sessionStorage.getItem("token")
      }
    });
};

class NewFriendForm extends React.Component {
    state = {
        name: '',
        age: '',
        email:'',
        id: Date.now()
    };

    handleChanges = e =>{
        let value = e.target.value;
        this.setState({
            ...this.state, [e.target.name]: value
        });
    }
    handleSubmit = e => {
        console.log(this.state);
        e.preventDefault();
        axioWithAuth()
            .post("http://localhost:5000/api/friends", this.state)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        this.props.history.push('/protected/friendlist')
    };
    
    render() {
        return(
            <div className='add-friend'>
                <form onSubmit={this.handleSubmit}>
                    <h1>Add a new Friend</h1>
                    <label htmlFor='name'>
                        Name: <input name='name' type='text' onChange={this.handleChanges} />
                    </label>
                    <label htmlFor='age'>
                        Age: <input name='age' type='text' onChange={this.handleChanges} />
                    </label>
                    <label htmlFor='email'>
                        Email: <input name='email' type='text' onChange={this.handleChanges} />
                    </label>
                    <input type='submit' />
                </form>
            </div>
        )
    }
}

export default NewFriendForm;