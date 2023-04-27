import { Component } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { ImSearch } from 'react-icons/im';
import { Form, ButtonSubmit, FieldStyled, Span } from './Searchbar.styled';

const initialValues = { name: '' };

const formSchema = yup.object().shape({
  name: yup.string().trim().required('Required field!'),
});

export default class Searchbar extends Component {
  state = {
    pictureName: '',
  };

  handleNameChange = e => {
    this.setState({ pictureName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ pictureName: '' });
  };

  render() {
    return (
      <header class="searchbar">
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={this.handleSubmit}
        >
          <Form htmlFor="name">
            <ButtonSubmit type="submit">
              <Span>Search</Span>
            </ButtonSubmit>

            <FieldStyled
              type="text"
              autocomplete="off"
              autofocus
              placeholder="Search images and photos"
              onChange={this.handleNameChange}
            />
          </Form>
        </Formik>
      </header>
    );
  }
}
