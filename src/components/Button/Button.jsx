import css from './Button.module.css'
export const Button = ({click}) =>{
    return <button type="button" className={css.button} onClick={click}>Load more</button>
}