import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  };

  return { data, fetchData };
};

  // const [employees, setEmployees] = useState([]);
  // const [leaves, setLeaves] = useState([]);
  // const [signatories, setSignatories] = useState([]);

  // const fetchEmployees = async () => {
  //   const res = await fetch('/api/employees');
  //   const data = await res.json();
  //   setEmployees(data);
  // };

  // const fetchLeaves = async () => {
  //   const res = await fetch('/api/leaves');
  //   const data = await res.json();
  //   setLeaves(data);
  // };

  // const fetchSignatories = async () => {
  //   const res = await fetch('/api/signatories');
  //   const data = await res.json();
  //   setSignatories(data);
  // };

  // useEffect(() => {
  //   fetchEmployees();
  //   fetchLeaves();
  //   fetchSignatories();
  // }, []);