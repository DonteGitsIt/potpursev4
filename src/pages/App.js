import React, { Component } from 'react';
import './styles/App.css';
import Nav from '../components/Nav';
import ResultBox from '../components/ResultBox';
import SearchBox from '../components/SearchBox';
import ParamBox from '../components/ParamBox';
import ParamResult from '../components/ParamResult';
import Result from '../components/Result';
import API from '../utils/API';
/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from '../components/AuthHelperMethods';
//Our higher order component
import withAuth from '../components/withAuth';


class App extends Component {

  /* Create a new instance of the 'AuthHelperMethods' compoenent*/

  state = {
    username: "",
    password: "",
    search: "",
    searchResults: [],
    searchParam: "strain",
    strainToSave: {},
    buttonValue: null,
    formSubmitted: false,
    faqClicked: false,
    nameOfFaq: "",
    faqResults: []
  }
  Auth = new AuthHelperMethods();

  _handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  _handleFormSubmit = (e) => {
    e.preventDefault();
  
    this.setState(
      {
      searchResults: []
    })

    if (this.state.searchParam === "strain") {
      API.searchStrainName(this.state.search)
        .then((res) => {
          console.log(res.data)
          
          
            for(let i = 0; i < res.data.length;i++){
              this.state.searchResults.push(res.data[i])
            }

            this.setState({formSubmitted: true})
        })
        .catch(err => console.log(err));
    } else if (this.state.searchParam === "race") {
      API.searchRace(this.state.search)
        .then((res) => {
          console.log(res.data)
          for(let i = 0; i < res.data.length;i++){
            this.state.searchResults.push(res.data[i])
          }

          this.setState({formSubmitted: true})
        })
        .catch(err => console.log(err));
    } else if (this.state.searchParam === "effect") {
      API.searchEffect(this.state.search)
        .then((res) => {
          console.log(res.data)
          for(let i = 0; i < res.data.length;i++){
            this.state.searchResults.push(res.data[i])
          }

          this.setState({formSubmitted: true})
        })
        .catch(err => console.log(err));
    } else if (this.state.searchParam === "flavor") {
      API.searchFlavor(this.state.search)
        .then((res) => {
          console.log(res.data)
          for(let i = 0; i < res.data.length;i++){
            this.state.searchResults.push(res.data[i])
          }

          this.setState({formSubmitted: true})
        })
        .catch(err => console.log(err));
    }
  }

  _handleSave = (strainName) => {
    console.log(strainName)
    
    API.searchStrainName(strainName)
      .then((res) => {
        for(let i = 0; i < res.data.length;i++){
          if(res.data[i].name === strainName){
            if(res.data[i].desc === null){
              this.setState({strainToSave:{
                userName: this.props.confirm.username,
                name: res.data[i].name,
                race: res.data[i].race,
                description: "No description found"
              }})
              console.log(this.state.strainToSave)
              API.saveStrain(this.state.strainToSave).catch(err => console.log(err));
              alert( res.data[i].name + " saved")
            }else{
              this.setState({strainToSave:{
                userName: this.props.confirm.username,
                name: res.data[i].name,
                race: res.data[i].race,
                description: res.data[i].desc
              }})
              console.log(this.state.strainToSave)
              API.saveStrain(this.state.strainToSave).catch(err => console.log(err));
              alert( res.data[i].name + " saved")
            }
          }
        }
        
        
      })
      .catch(err => console.log(err));
  }

  _handleParams = (newParam, newHtml) => {
    this.setState(
      {
        searchParam: newParam,
        buttonValue: newHtml

      })
    console.log(this.state.searchParam)
  }

  _handleEffectsFaq = () => {
    this.setState({
      nameOfFaq: "Available effects to search",
      faqResults: []
    })

    API.getEffects()
    .then((res) => {
      for(let i =0; i< res.data.length;i++){
        this.state.faqResults.push(res.data[i])
      }
      this.setState({faqClicked: true})
    })
  }

  _handleFlavorsFaq = () => {
    this.setState({
      nameOfFaq: "Available flavors to search",
      faqResults: []
    })

    API.getFlavors()
    .then((res) => {
      for(let i =0; i< res.data.length;i++){
        this.state.faqResults.push(res.data[i])
      }
      if(res.data.length > 0){
        this.setState({
          faqClicked: true,
        })
      }
      console.log(this.state.faqResults)
    })
  }

  // takes user back to search
  _return = () => {
    this.setState({
      formSubmitted: false,
      faqClicked: false,
      nameOfFaq: ""
    })
    
  }
  /* Here will want to add a method to log the user out upon clicking 'Logout' */
  _handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  }

  //Render the protected component
  render() {

    let name = this.props.confirm ? this.props.confirm.username : "NULL";


    return (
      <div className="App">
        <div className="main-page">
          <div className="top-section">
            <Nav
              logout={this._handleLogout} />

          </div>
          <div className="bottom-section">
            {
              this.state.formSubmitted === false && this.state.faqClicked === false ?

                <SearchBox
                  header={<img src="pp_logo.jpg" alt="logo"></img>}
                  handleParams={this._handleParams}
                  buttonText={this.state.buttonValue}
                >
                  <input
                    className="form_item"
                    placeholder="Search..."
                    name="search"
                    type="text"
                    onChange={this._handleChange}
                  />
                  <button onClick={this._handleFormSubmit} className="form-submit">Search</button>
                  <strong id="effectsFaq" onClick={this._handleEffectsFaq}>What effects can I search?</strong>
                  <strong id="flavorsFaq" onClick={this._handleFlavorsFaq}>What flavors can I search?</strong>
                </SearchBox>
                :
                this.state.formSubmitted === true ?
                <ResultBox
                script={this._return}
                >
                

                {this.state.searchResults.map( strain => {
                  return(
                    <Result
                    save={this._handleSave}
                    key={strain.id}
                    userName={name}
                    name={strain.name}
                    race={strain.race}
                    description={strain.desc}
                    />
                  )
                })}

                </ResultBox>
                :
                this.state.faqClicked === true ? 
                <ParamBox
                  header={this.state.nameOfFaq}
                  script={this._return}
                >
                {this.state.faqResults.map( result => {
                  return (
                    <ParamResult
                    key={result.effect === undefined ? result : result.effect}
                    name={result.effect === undefined ? result : result.effect}
                    />
                  )
                })}
                </ParamBox>
                :
                <div>react is confused</div>
              }

            

          </div>
        </div>
      </div>
    );
  }
}

//In order for this component to be protected, we must wrap it with what we call a 'Higher Order Component' or HOC.
export default withAuth(App);
