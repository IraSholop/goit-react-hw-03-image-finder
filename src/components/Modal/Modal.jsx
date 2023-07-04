import { Component } from "react";
import css from './Modal.module.css'

export class Modal extends Component {
    componentDidMount(){
        window.addEventListener('keydown', this.handleKeyDown)
    }

   componentWillUnmount(){
    window.removeEventListener('keydown', this.handleKeyDown)
   }


    handleKeyDown = e =>{
        if (e.code === 'Escape') {
            this.props.onClose()
        }
    }

    handleBackdropClick = event =>{
        if (event.target === event.currentTarget) {
            this.props.onClose()
        }
    }

    render(){
        return(
            <div className={css.overlay} onClick={this.handleBackdropClick}>
               <div className={css.modal}>
                {this.props.url && <img src={this.props.url} alt=""/>}
               </div>
            </div>
        )
    }
}