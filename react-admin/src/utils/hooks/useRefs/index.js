// @flow
import { useState, useCallback, useEffect, useRef } from 'react';

type Props = {
  fields: Array<string>,
  defaultEl: string,
};

export default (props: Props) => {
  const { fields, defaultEl } = props;

  const [isMounted, setMounted] = useState(false);

  const refs: Object = fields.reduce(
    (acc, field: string) => ({ ...acc, [field]: useRef(null) }),
    {},
  );

  const setFocus = useCallback(
    (propName: string) => {
      if (refs[propName] && refs[propName].current) {
        refs[propName].current.focus();
      }
    },
    [refs],
  );

  useEffect(() => {
    if (!isMounted && defaultEl) {
      setMounted(true);
      setFocus(defaultEl);
    }
  }, [setFocus, isMounted, defaultEl]);

  return {
    refs,
    setFocus,
  };
};
