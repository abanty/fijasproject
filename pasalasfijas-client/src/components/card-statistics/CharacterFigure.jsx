import classnames from 'classnames'

const CharacterFigure = ({ src, alt = '', className, banner = false }) => (
  <img
    src={src}
    alt={alt}
    className={classnames(
      'character-figure pointer-events-none select-none object-contain object-bottom is-auto',
      banner
        ? 'character-figure--banner'
        : 'absolute block-end-0 inline-end-2 sm:inline-end-4 bs-32 sm:bs-40 md:bs-44 max-is-[40%]',
      className
    )}
  />
)

export default CharacterFigure
