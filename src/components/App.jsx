import React from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';


export class App extends React.Component{
  state = {
    value: '',
  }

  formSubmitHandler = ({value}) => {
    this.setState({value})
  }

  render() {
    return (
      <>
      <Searchbar onSubmit={this.formSubmitHandler}/>
       <ImageGallery Value={this.state.value}/>
      </>
    )
  }

  
}
