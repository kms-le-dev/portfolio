import { useEffect, useState } from 'react';
import { getModuleContents } from './api';

export function useModuleContents(module) {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    let active = true;
    getModuleContents(module)
      .then((items) => {
        if (active) setContents(Array.isArray(items) ? items : []);
      })
      .catch(() => {
        if (active) setContents([]);
      });
    return () => { active = false; };
  }, [module]);

  return contents.map((item) => ({ ...item.payload, id: item.id, title: item.payload?.title || item.title }));
}
