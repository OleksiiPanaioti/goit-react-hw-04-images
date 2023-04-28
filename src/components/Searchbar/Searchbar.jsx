import { Component } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
// import { ImSearch } from 'react-icons/im';
import { Form, ButtonSubmit, FieldStyled, Span } from './Searchbar.styled';

const initialValues = { name: '' };

// const formSchema = yup.object().shape({
//   name: yup.string().trim().required('Required field!'),
// });

export default class Searchbar extends Component {
  state = {
    pictureName: '',
  };

  handleNameChange = event => {
    this.setState({ pictureName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    // e.preventDefault();

    this.props.onSubmit(this.state.pictureName);

    this.setState({ pictureName: '' });
  };

  render() {
    return (
      <header>
        <Formik
          initialValues={initialValues}
          //   validationSchema={formSchema}
          onSubmit={this.handleSubmit}
        >
          <Form htmlFor="name">
            <ButtonSubmit type="submit" className="button">
              <span className="button-label">Search</span>
            </ButtonSubmit>

            <FieldStyled
              name="name"
              type="text"
              placeholder="Search images and photos"
              onChange={this.handleNameChange}
            />
          </Form>
        </Formik>
      </header>
    );
  }
}
