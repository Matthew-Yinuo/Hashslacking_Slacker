import React, { Component } from 'react';
import { Button, Input, Container, Header } from 'semantic-ui-react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class Register extends Component {

state = {
    username:'',
    email:'',
    password:''
}

onChange = e =>{
   const {name,value} = e.target;
   //name = "email";
   this.setState({[name]:value});
};

onSubmit = async () => {
    const response = await this.props.mutate({
       variables:this.state,
   });
   console.log(response);
};

render(){

    const { onChange, onSubmit } = this;
    const {username, email,password} = this.state;
return (
    <Container text>
    <Header as="h2">Register</Header>
    <Input
      name="username"
      onChange={onChange}
      value={username}
      placeholder="Username"
      fluid
    />
    <Input name="email" onChange={onChange} value={email} placeholder="Email" fluid />
    <Input
      name="password"
      onChange={onChange}
      value={password}
      type="password"
      placeholder="Password"
      fluid
    />
    <Button onClick={onSubmit}>Submit</Button>
</Container>
)
}
}


const registerMutation = gql `
mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;


export default graphql(registerMutation)(Register);