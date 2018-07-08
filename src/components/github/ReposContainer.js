import React, { Component } from 'react'
import { fetchRepos } from '../../service/repos-api'
import ReposList from './ReposList'

class ReposContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            repos: [],
            username: ''
        }
        /*O método dentro de uma classe ES2015 não faz o bind automaticamente
        *para o this ou para a própria classe. Por isso esse bind no constructor
        */
        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    changeHandler(ev) {
        //window.console.log(ev.target.value)~
        //debugger
        this.setState({ username: ev.target.value})
    }

    submitHandler(ev) {
        /*preventDefault evita que a ação padrão do form seja executada
        *pois nesse caso estamos trabalhando também com um form com a ação de submit
        *mas que não deve ser enviado executando o get no http
        */
        ev.preventDefault()
        fetchRepos(this.state.username).then(res => this.setState({ repos: res.data}))
    }

    render() {
        return (
            <div>
                <h1>Repos</h1>
                <form action="#" onSubmit={this.submitHandler}>
                    <input
                        onChange={this.changeHandler}
                        style={{width: '250px'}}
                        type="search"
                        placeholder="Informe o usuário e tecle Enter" />
                </form>
                <ReposList repos={this.state.repos}></ReposList>
            </div>
        )
    }
}

export default ReposContainer