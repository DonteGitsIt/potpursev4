import React, { Component } from 'react';
import './styles/App.css';
import Nav from '../components/Nav';
import SavedBox from '../components/SavedBox';
import SavedResult from '../components/SavedResult';
import API from '../utils/API';
/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from '../components/AuthHelperMethods';
//Our higher order component
import withAuth from '../components/withAuth';

class Save extends Component {
    Auth = new AuthHelperMethods();
    state = {
        username: "",
        password: "",
        savedStrains: [],
        renderStrains: false
    }

    componentDidMount() {
        this._loadStrains()

    }

    _loadStrains = () => {
        this.setState({ savedStrains: [] })

        API.getStrains()
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].userName === this.props.confirm.username) {
                        this.state.savedStrains.push(res.data[i])
                    }
                }
                console.log(this.state.savedStrains)
                if(res.data.length > 0){this.setState({ renderStrains: true })}
                else{this.setState({renderStrains: false})}
            })
    }


    _handleLogout = () => {
        this.Auth.logout()
        this.props.history.replace('/login');
    }

    render() {

        // let name = this.props.confirm ? this.props.confirm.username : "NULL";


        return (
            <div className="App">
                <div className="main-page">
                    <div className="top-section">
                        <Nav
                            logout={this._handleLogout} />

                    </div>
                    <div className="bottom-section">


                        {this.state.renderStrains === true ?
                            <SavedBox>


                                {this.state.savedStrains.map(strain => {
                                    return (
                                        <SavedResult
                                            key={strain.userName}
                                            name={strain.name}
                                            race={strain.race}
                                            description={strain.description}
                                        />
                                    )
                                })}

                            </SavedBox>

                            :

                            <SavedBox>
                                <div>No strains found ):</div>
                            </SavedBox>
                        }




                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(Save)