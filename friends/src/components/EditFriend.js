import React from 'react'
import axios from "axios";

const axioWithAuth = () => {
    return axios.create({
      headers: {
        authorization: sessionStorage.getItem("token")
      }
    });
};
class EditFriend extends React.Component {
    state = {
        name:'',
        age: '',
        email: '',
        id: ''
    };

    componentDidMount() {
        this.getData();
        if(!sessionStorage.getItem("token")) {
            console.error("Please Login");
        } else {
            console.info("Logged in");
        }
    }
    getData = () => {
        const authAxios = axioWithAuth();
        authAxios
            .get(`http://localhost:5000/api/friends/${this.props.match.params.id}`)
            .then(res => {
                this.setState(res.data)
            });
    }
    handleChanges = e =>{
        let value = e.target.value;
        this.setState({
            ...this.state, [e.target.name]: value
        });
    }
    handleSubmit = e => {
        e.preventDefault();
        axioWithAuth()
            .put(`http://localhost:5000/api/friends/${this.state.id}`, this.state)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        this.props.history.push('/protected/friendlist')
    };

    render() {
        console.log(this.state)
        return(
            <div className='edit-friend'>
                <form onSubmit={this.handleSubmit}>
                    <h1>Edit a Friend</h1>
                    <label htmlFor='name'>
                        Name: <input name='name' type='text' defaultValue={this.state.name} onChange={this.handleChanges} />
                    </label>
                    <label htmlFor='age'>
                        Age: <input name='age' type='text' defaultValue={this.state.age} onChange={this.handleChanges} />
                    </label>
                    <label htmlFor='email'>
                        Email: <input name='email' type='text' defaultValue={this.state.email} onChange={this.handleChanges} />
                    </label>
                    <input type='submit' />
                </form>
            </div>
        )
    }
}

export default EditFriend;