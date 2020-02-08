/* eslint-disable import/prefer-default-export */
// @flow

export const translateLinkItem = (
  t: string => string,
  linkItem: AppLinkProps,
): AppLinkProps => {
  const { title, links } = linkItem;

  const translatedLinks = links
    ? links.map(item => translateLinkItem(t, item))
    : links;

  const translated = { ...linkItem, title: t(title), links: translatedLinks };

  return translated;
};
