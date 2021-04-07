export const _handleClickOutside = (event, ref, handleClickOutside) => {
  if (event.target !== ref.current) {
    handleClickOutside();
  }
};
