import { Box } from './box/Box';
import { Container, Title } from './App.styled';
import { Component } from 'react';
import { ContactForm } from './form/Form';
import ContactList from './contacts/ContactsList';
import { nanoid } from 'nanoid';
import { Filter } from './filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  submitForm = (values, { resetForm }) => {
    const oldContact = this.state.contacts.find(
      person => person.name.toLowerCase() === values.name.toLowerCase()
    );

    if (oldContact) {
      alert(` ${values.name} is already in contacts.`);
      return;
    }

    const person = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    this.setState(prevState => {
      return {
        contacts: [person, ...prevState.contacts],
      };
    });
    resetForm();
  };

  onFilter = evt => {
    this.setState({
      filter: evt.target.value,
    });
  };

  onDelete = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(c => c.id !== id),
      };
    });
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const newContacts = this.state.contacts.filter(person =>
      person.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <Box
        as={'div'}
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
        backgroundColor="#1d2327"
      >
        <Container>
          <Title>Phonebook</Title>
          <ContactForm submitForm={this.submitForm} />
          <Filter onFilter={this.onFilter} filter={this.state.filter} />
          <ContactList
            contactsInfo={newContacts}
            deleteContact={this.onDelete}
          />
        </Container>
      </Box>
    );
  }
}
