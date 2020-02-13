import React, { Component } from 'react';

import { FaPhone, FaCalculator, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton, Result } from './styles';

export default class Main extends Component {
  state = {
    source: '',
    destination: '',
    duration: '',
    plan_id: '1',
    calls: [],
    loading: false,
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { source, destination, duration, plan_id, calls } = this.state;

    const response = await api.post('/calls', {
      source,
      destination,
      duration,
      plan_id,
    });

    const data = {
      normal_price: response.data.normal_price,
      price: response.data.price,
      duration,
      source,
      destination,
    };

    this.setState({
      calls: [...calls, data],
      source: '',
      destination: '',
      duration: '',
      plan_id: '1',
      loading: false,
    });
  };

  render() {
    const {
      source,
      destination,
      duration,
      plan_id,
      loading,
      calls,
    } = this.state;

    return (
      <Container>
        <h1>
          <FaPhone />
          FaleMais Vizir
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <select
            name="plan_id"
            value={plan_id}
            onChange={this.handleInputChange}
          >
            <option value="1">FaleMais 30</option>
            <option value="2">FaleMais 60</option>
            <option value="3">FaleMais 120</option>
          </select>
          <input
            type="text"
            placeholder="DDD de origem"
            name="source"
            value={source}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="DDD de destino"
            name="destination"
            value={destination}
            onChange={this.handleInputChange}
          />
          <input
            type="number"
            placeholder="Duração da chamada"
            name="duration"
            value={duration}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaCalculator color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <Result>
          {calls.map(calls => (
            <div>
              <span key={calls.source}>DDD de origem: {calls.source}</span>
              <br />
              <span key={calls.destination}>
                DDD de destino: {calls.destination}
              </span>
              <br />
              <span key={calls.duration}>
                Duração: {calls.duration} minutos
              </span>
              <br />
              <span key={calls.price}>Preço com o plano: R$ {calls.price}</span>
              <br />
              <span key={calls.normal_price}>
                Preço sem o plano: R$ {calls.normal_price}
              </span>
            </div>
          ))}
        </Result>
      </Container>
    );
  }
}
