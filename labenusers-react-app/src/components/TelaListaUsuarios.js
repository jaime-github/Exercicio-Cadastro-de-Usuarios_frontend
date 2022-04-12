import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const CardUsuario = styled.div`
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    width: 300px;
    display: flex;
    justify-content: space-between;
`

const headers = {
    headers: {
        Authorization: "jaime-epifanio-moreira"}
    }

const urlCadastroUsers = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users";


export default class TelaListaUsuarios extends React.Component {
    state = {
        usuarios: [],
        
    }

    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers = () => {
        axios.get(urlCadastroUsers, headers)                         
        
        .then((res) => {
        this.setState({usuarios: res.data})
        })
        .catch((err) => {
            alert("Ops, algo de errado ocorreu, tente novamente!")
        })  
    }

    deleteUsers = (id) => {
        axios.delete (`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}` , headers)
                
        .then((res)=> {
            alert('Usuário(a) deletado(a) com sucesso!')
            this.getAllUsers()
          })
        .catch((err) => {
            alert("Ops, algo de errado ocorreu, tente novamente!")
          }) 
      }
    
       render() {
        const listaUsuarios = this.state.usuarios.map((user) => {
            return (
            <CardUsuario 
            key={user.id}>
            {user.name}
            <button onClick={() => this.deleteUsers(user.id)}>Remover Usuário</button>
            </CardUsuario>            
            )}    
        )
           return (
               <div> 
                    <button onClick={this.props.irParaCadastro}>Ir para Cadastro</button>
                    <h2>{listaUsuarios}</h2>
               </div>
           )
       }              
    }




