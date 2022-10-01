import React, { Component } from "react";
import axios from "axios";
import { useEffect } from "react";

class Form extends Component {
  state = {
    fname: "",
    lname: "",
    fetched: false,
    newFname: "",
    newLname: "",
    added: false,
    allusers: [],
  };

  getAll = async (e) => {
    try {
      axios.get("/all").then((response) => {
        this.setState({ allusers: response.data });
      });
    } catch (e) {
      console.log(e);
    }
  };

  getAllHook = () => {
    useEffect(() => {
      this.getAll();
    }, []);
  };

  retrieveUser = async (e) => {
    try {
      const acc = await axios.get(
        "/" + this.state.fname + "/" + this.state.lname
      );
      if (acc.data.length > 0) {
        this.setState({ fetched: true });
      } else {
        this.setState({ fetched: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  addUser = async (e) => {
    try {
      await axios.post("/create", {
        newFname: this.state.newFname,
        newLname: this.state.newLname,
      });
    } catch (error) {
      console.log(error);
    }
  };

  errorMsg = () => {
    return <h3>Fields must not be empty</h3>;
  };

  render() {
    return (
      <>
        <form>
          <h1>Retrieve a user</h1>
          <label>
            Enter your first name:
            <br />
            <input
              type="text"
              value={this.state.fname}
              onChange={(e) => this.setState({ fname: e.target.value })}
            />
          </label>
          <br />
          <label>
            Enter your last name:
            <br />
            <input
              type="text"
              value={this.state.lname}
              onChange={(e) => this.setState({ lname: e.target.value })}
            />
          </label>
          <br />
        </form>
        <br />
        {this.state.fname !== "" && this.state.lname !== "" ? (
          <button onClick={this.retrieveUser}>Send</button>
        ) : (
          <this.errorMsg />
        )}

        {this.state.fetched && <h2>Retrieved user from database</h2>}
        <br />
        <br />

        <form>
          <h1>Create a new user</h1>
          <label>
            Enter new first name:
            <br />
            <input
              type="text"
              value={this.state.newFname}
              onChange={(e) => this.setState({ newFname: e.target.value })}
            />
          </label>
          <br />
          <label>
            Enter new last name:
            <br />
            <input
              type="text"
              value={this.state.newLname}
              onChange={(e) => this.setState({ newLname: e.target.value })}
            />
          </label>
          <br />
        </form>
        <br />
        {this.state.newFname !== "" && this.state.newLname !== "" ? (
          <button
            onClick={(event) => {
              this.addUser();
              this.getAll();
            }}
          >
            Add
          </button>
        ) : (
          <this.errorMsg />
        )}
        <br />
        {this.state.added && <h2>Added new user</h2>}

        <h1>All users in database</h1>
        <this.getAllHook />
        <ul>
          {this.state.allusers.map((user) => (
            <li key={user.userid}>
              {user.fname} {user.lname}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Form;
