import { useEffect, useState } from "react";

import { Module } from "../types.global";

const useCurrentModules = () => {
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    const fetchModules = async () => {
      const response = await fetch("http://localhost:3001/modules");
      const modules = await response.json();
      setModules(modules);
    };

    fetchModules();
  }, []);

  return {
    modules,
  };
};

export default useCurrentModules;
