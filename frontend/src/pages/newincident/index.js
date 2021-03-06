import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';


import './style.css';

export default function Newincident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('incidents', data, {
                headers:{
                    authorization: ongId,
                }
            })

            history.push('/profile');

        }catch(err){
            alert('Erro ao cadastrar, tente novamente.');
        };
    }
    
    
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" ></img>
                    <h1>Cadastro Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi par resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft  size={16} color="e02041" className="icone"/>
                        Voltar para Home
                    </Link>
                
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                    placeholder="Titulo do Caso" 
                    value = {title}
                    onChange = {e => setTitle(e.target.value)}
                    />
                    <textarea 
                    placeholder="Detalhamento do caso" 
                    value = {description}
                    onChange = {e => setDescription(e.target.value)}
                    />
                    <input 
                    placeholder="Valor" 
                    value = {value}
                    onChange = {e => setValue(e.target.value)}
                    />
                    <button className="button">Cadastrar</button>
                </form>

            </div>
        </div>
    );
}