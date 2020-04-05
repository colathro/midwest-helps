export const isElementInView = (el: any) => {
  let top = el.offsetTop;
  let height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
  }

  return (
    top >= window.pageYOffset &&
    top + height <= window.pageYOffset + window.innerHeight
  );
};
