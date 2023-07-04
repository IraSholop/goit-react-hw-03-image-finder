import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({url, onOpen, urlModal}) => {
    return(
        <li onClick={()=>onOpen(urlModal)} className={css.imagegalleryitem}>
            <img src={url} alt="" className={css.imagegalleryitemimage} />
        </li>
    )
}