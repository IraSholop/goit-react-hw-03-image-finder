import React from 'react';
import css from './Searchbar.module.css'

export class Searchbar extends React.Component{
    state = {
       value: ''
    }

    handleChange = e => {
        this.setState({value: e.currentTarget.value})
    }
    
    handleSubmit = e => {
        e.preventDefault();
        if (this.state.value.trim() === '') {
          alert('введіть щось');
          return;
        }
        this.props.onSubmit(this.state);
        this.setState({value : ''});
      };


    render(){
        return(
            <header className={css.searchbar}>
            <form className={css.form} onSubmit={this.handleSubmit}>
              <button type="submit" className={css.button}>  
              <i className="gg-search"></i>
                 <span className={css.buttonlabel}>Search </span>
              </button>
      
              <input
                  className={css.input}
                  type="text"
                  autoComplete="off"
                  autoFocus
                  placeholder="Search images and photos"
                  onChange={this.handleChange}
                  value={this.state.value}
              />
            </form>
          </header>)
        
    }
}
