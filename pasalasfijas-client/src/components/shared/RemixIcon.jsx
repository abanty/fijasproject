import classnames from 'classnames'

const sizeClassMap = {
  xs: 'remix-icon--xs',
  sm: 'remix-icon--sm',
  md: 'remix-icon--md',
  lg: 'remix-icon--lg',
  xl: 'remix-icon--xl'
}

const RemixIcon = ({ icon, className, size = 'md', ...rest }) => {
  if (!icon) return null

  return (
    <i
      className={classnames(icon, 'remix-icon', sizeClassMap[size], className)}
      aria-hidden
      {...rest}
    />
  )
}

export default RemixIcon
