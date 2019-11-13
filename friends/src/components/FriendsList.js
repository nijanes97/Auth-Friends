import React from 'react'
import axios from "axios";


const axioWithAuth = () => {
  return axios.create({
    headers: {
      authorization: sessionStorage.getItem("token")
    }
  });
};
class FriendsList extends React.Component {
    state = {
        friendList: []
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
            .get("http://localhost:5000/api/friends")
            .then(res => {
                this.setState({ friendList: res.data })
            });
    }


    render() {
        console.log(this.state.friendList);
        return(
            <div className='friend-list'>
                {this.state.friendList.map(friend => (
                    <div className="friend">
                        <h3>{friend.name}</h3>
                        <p>{friend.age}</p>
                        <p>{friend.email}</p>
                        <button onClick={() => this.props.history.push(`/protected/${friend.id}/edit`)}>Edit</button>
                        <button onClick={() => {
                            axioWithAuth()
                                .delete(`http://localhost:5000/api/friends/${friend.id}`)
                                .then(res => {
                                    this.setState({ friendList: res.data })
                                })
                                .catch(err => console.log(err))
                        }}>Remove</button>
                    </div>
                ))}
            </div>
        )
    }
}

export default FriendsList;