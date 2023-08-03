import styles from './ImagePicker.module.scss'
import image from '../../assets/image.png'

export const ImagePicker = ({ label, multiple, onChange, imageData, height, expand = true }) => {
  return (
    <div
      className={expand ? styles.imagePickerWrapperExpanded : styles.imagePickerWrapper}
      style={{
        height: height ? `${height}px` : '160px',
      }}
    >
      <div
        className={expand ? styles.imagePickerExpanded : styles.imagePicker}
        style={{
          height: height ? `${height}px` : '160px',
        }}
      >
        {imageData && <img src={imageData} className={styles.image} />}
        <input
          onChange={onChange}
          type="file"
          className={styles.imagePickerInput}
          multiple={multiple}
        />
        {!imageData && <img src={image} className={styles.icon} />}
      </div>
      {label && <div className={styles.label}>{label}</div>}
    </div>
  )
}
